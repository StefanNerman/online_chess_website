using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using GenericClassesLibrary.Generic.ChessWebsite.utils;
using Microsoft.AspNetCore.Http;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketConnection
{
    private readonly RequestDelegate _next;

    private readonly WebsocketConnectionManager _manager;

    public WebsocketConnection(RequestDelegate next, WebsocketConnectionManager manager)
    {
        _next = next;
        _manager = manager;
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
                        Console.WriteLine(token);
                        Console.WriteLine(_manager.GetAllUsersConnected()[token]);
                        Console.WriteLine(_manager.GetAllUsersConnected());
                        string clientMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        Console.WriteLine(clientMessage);
                        WebsocketReceivedMessageHandler messageHandler = new WebsocketReceivedMessageHandler();
                        await messageHandler.HandleMessage(clientMessage, _manager);
                        return;
                    }
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        Console.WriteLine("close request received");
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
