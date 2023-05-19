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
            var clientMessage = JsonConvert.DeserializeObject<dynamic>(message);

            Console.WriteLine(clientMessage.ToString());

            if(clientMessage.protocol == "FIND_MATCH") 
            { 
                
            }

            //TO DELETE
            if (clientMessage.protocol == "SEND_INFO")
            {
                var ws = manager.GetAllUsersConnected().FirstOrDefault(s => s.Key == clientMessage.data.message.ToString());
                await SendStringAsync(ws.Value, clientMessage.data.id.ToString());
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
