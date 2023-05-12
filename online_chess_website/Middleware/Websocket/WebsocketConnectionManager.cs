using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace online_chess_website.Middleware.Websocket;

public static class WebsocketConnectionManager
{
    private static ConcurrentDictionary<string, WebSocket> usersConnected = new ConcurrentDictionary<string, WebSocket>();

    public static ConcurrentDictionary<string, WebSocket> GetAllUsersConnected()
    {
        return usersConnected;
    }

    public static void AddConnection(string token, WebSocket websocket)
    {
        usersConnected.TryAdd(token, websocket);
        Console.WriteLine("Connection added: " + token);
    }
}
