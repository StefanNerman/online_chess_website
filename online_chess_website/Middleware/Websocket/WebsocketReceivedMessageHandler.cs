using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketReceivedMessageHandler
{
    public async Task HandleMessage(string message, WebsocketConnectionManager manager)
    {
        if (message != null || message != "")
        {
            
        }
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        var buffer = Encoding.UTF8.GetBytes("STRING MESSAGE: " + message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }

    private WebSocket GetSocketByToken(string token, WebsocketConnectionManager manager)
    {
        ConcurrentDictionary<string, WebSocket>  usersConnected = manager.GetAllUsersConnected();
        //DELETE
        // WebSocket websocket = usersConnected.get( token )
        //return websocket
        return usersConnected[token];
    }
}
