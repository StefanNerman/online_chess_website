using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Linq;
using online_chess_website.Middleware.GameFinder;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketReceivedMessageHandler
{
    public async Task HandleMessage(string token, string message, WebsocketConnectionManager manager, QuemodeActions quemode)
    {

        if (message != null || message != "")
        {
            var clientMessage = JsonConvert.DeserializeObject<dynamic>(message);

            Console.WriteLine(clientMessage.ToString());

            if(clientMessage.protocol == "FIND_MATCH") 
            {
                int userId = int.Parse(clientMessage.data.userId.ToString());
                int rank = int.Parse(clientMessage.data.rank.ToString());
                quemode.AddUserToQue(token, new UserQuedata(userId, rank));
            }

            if(clientMessage.protocol == "USER_MOVE")
            {
                int from = clientMessage.data.from;
                int to = clientMessage.data.to;
                int matchId = clientMessage.data.matchId;
                Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(clientMessage));
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
