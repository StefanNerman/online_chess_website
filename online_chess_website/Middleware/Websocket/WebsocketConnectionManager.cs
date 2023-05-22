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

    public bool AddConnection(string token, WebSocket websocket)
    {
        Console.WriteLine("Connection added: " + token);
        return usersConnected.TryAdd(token, websocket);
    }

    public bool RemoveConnection(string token)
    {
        Console.WriteLine("Connection removed: " + token);
        return usersConnected.TryRemove(token, out WebSocket websocket);
    }
}
