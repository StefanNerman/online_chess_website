using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Sessions;
using GenericClassesLibrary.Generic.ChessWebsite.utils;
using Microsoft.AspNetCore.Http;
using online_chess_website.Data;
using online_chess_website.Middleware.GameFinder;
using online_chess_website.Multiplayer;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketConnection
{
    private readonly RequestDelegate _next;

    private readonly WebsocketConnectionManager _manager;

    private readonly QuemodeActions _quemodeActions;

    private readonly OngoingMatches _ongoingMatches;

    public WebsocketConnection(RequestDelegate next, WebsocketConnectionManager manager, QuemodeActions quemodeActions, OngoingMatches ongoingMatches)
    {
        _next = next;
        _manager = manager;
        _quemodeActions = quemodeActions;
        _ongoingMatches = ongoingMatches;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            string userCookie = context.Request.Headers.Cookie;
            string token = CookieParser.GetValue(userCookie, "ST");
            if (token != "")
            {
                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                _manager.AddConnection(token,webSocket);
                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        string clientMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        WebsocketReceivedMessageHandler messageHandler = new WebsocketReceivedMessageHandler();
                        await messageHandler.HandleMessage(token, clientMessage, _manager, _quemodeActions, _ongoingMatches);
                        return;
                    }
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        int userMatchId = _manager.GetAllUsersConnected()[token].ongoingMatchId;
                        if(userMatchId != 0)
                        {
                            Session userSession = await Sessions.GetSessionByToken(token, ConnectionStrings.defaultConnectionString);
                            int userId = userSession.userId;
                            int opponentId;
                            UserOngoingMatchInfo ongoingMatchInfo = _ongoingMatches.GetAllOngoingMatches()[userMatchId];
                            if(token == ongoingMatchInfo.player1Token)
                            {
                                Session opponentSession = await Sessions.GetSessionByToken(ongoingMatchInfo.player2Token, ConnectionStrings.defaultConnectionString);
                                opponentId = opponentSession.userId;
                                await SendStringAsync(_manager.GetAllUsersConnected()[ongoingMatchInfo.player2Token].websocket, 
                                    Newtonsoft.Json.JsonConvert.SerializeObject(new MatchIsOverMessage(new MatchIsOverMessageData("you"))));
                            }
                            else
                            {
                                Session opponentSession = await Sessions.GetSessionByToken(ongoingMatchInfo.player1Token, ConnectionStrings.defaultConnectionString);
                                opponentId = opponentSession.userId;
                                await SendStringAsync(_manager.GetAllUsersConnected()[ongoingMatchInfo.player1Token].websocket,
                                    Newtonsoft.Json.JsonConvert.SerializeObject(new MatchIsOverMessage(new MatchIsOverMessageData("you"))));
                            }
                            /*
                            save loss data
                            */
                            _ongoingMatches.RemoveOngoingMatch(userMatchId);
                        }
                        _quemodeActions.RemoveUserFromQue(token);
                        _manager.RemoveConnection(token);
                        return;
                    }
                });
            }
            else
            {
                await _next(context);
            }
        }
        else
        {
            await _next(context);
        }
    }

    private async Task ReceiveMessage(WebSocket webSocket, Action<WebSocketReceiveResult, byte[]> handleMessage)
    {
        var buffer = new byte[1024 * 4];
        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer), cancellationToken: CancellationToken.None);
            handleMessage(result, buffer);
        }
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        var buffer = Encoding.UTF8.GetBytes(message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
