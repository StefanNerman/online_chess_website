using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Linq;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketReceivedMessageHandler
{
    public async Task HandleMessage(string message, WebsocketConnectionManager manager)
    {
        // client will send the match id in the message, use the match id to get opponent and client tokens from the database
        if (message != null || message != "")
        {
            var data = JsonConvert.DeserializeObject<dynamic>(message);

            
            if (data.protocol == "SEND_INFO")
            {
                var ws = manager.GetAllUsersConnected().FirstOrDefault(s => s.Key == data.data.message.ToString());
                await SendStringAsync(ws.Value, data.data.id.ToString());
            }
            

            //figures out which procedure should be done according to the message
            //calls the right methods and sends the needed info to the opponent using the 
            //enemy using his token that it gets from the database "matches" table
        }
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        var buffer = Encoding.UTF8.GetBytes("STRING MESSAGE: " + message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
