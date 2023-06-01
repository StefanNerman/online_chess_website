using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using GenericClassesLibrary.Generic.ChessWebsite.utils;
using Microsoft.AspNetCore.Http;
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
                        await messageHandler.HandleMessage(token, clientMessage, _manager, _quemodeActions);
                        return;
                    }
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        /*
                        add instance for ongoing matches 
                        check if user token has any ongiong matches and if so get opponents token and send him a message alerting that his opponent left
                        */
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
}
