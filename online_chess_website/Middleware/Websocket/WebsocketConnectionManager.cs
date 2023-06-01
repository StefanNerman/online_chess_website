using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketConnectionManager
{
    private ConcurrentDictionary<string, WebsocketConnectionUserObject> usersConnected = new ConcurrentDictionary<string, WebsocketConnectionUserObject>();

    public ConcurrentDictionary<string, WebsocketConnectionUserObject> GetAllUsersConnected()
    {
        return usersConnected;
    }

    public bool AddConnection(string token, WebSocket websocket)
    {
        Console.WriteLine("Connection added: " + token);
        return usersConnected.TryAdd(token, new WebsocketConnectionUserObject(websocket));
    }

    public bool RemoveConnection(string token)
    {
        Console.WriteLine("Connection removed: " + token);
        return usersConnected.TryRemove(token, out WebsocketConnectionUserObject websocket);
    }

    public void AddOngoingMatch(string token, int matchId)
    {
        usersConnected[token].ongoingMatchId = matchId;
    }
}
