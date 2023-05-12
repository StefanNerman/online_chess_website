using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketConnectionManager
{
    private ConcurrentDictionary<string, WebSocket> usersConnected = new ConcurrentDictionary<string, WebSocket>();

    public ConcurrentDictionary<string, WebSocket> GetAllUsersConnected()
    {
        return usersConnected;
    }

    public void AddConnection(string token, WebSocket websocket)
    {
        usersConnected.TryAdd(token, websocket);
        Console.WriteLine("Connection added: " + token);
    }
}
