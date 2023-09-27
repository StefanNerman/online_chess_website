using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Linq;
using online_chess_website.Middleware.GameFinder;
using online_chess_website.Multiplayer;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Sessions;
using online_chess_website.Data;
using Org.BouncyCastle.Bcpg;
using System.Threading.Tasks.Dataflow;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketReceivedMessageHandler
{
    public async Task HandleMessage(string token, string message, WebsocketConnectionManager manager, QuemodeActions quemode, OngoingMatches ongoingMatches, PrivateQueActions privateQueActions)
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
            string playerColor = clientMessage.data.color;
            int matchId = clientMessage.data.matchId;
            MatchDataManager matchData = new MatchDataManager();
            string opponentToken = await matchData.GetOpponentToken(matchId, playerColor);
            WebSocket opponentSocket = manager.GetAllUsersConnected()[opponentToken].websocket;
            MoveMessage serverMessage = new MoveMessage("OPPONENT_MOVED", new { from = from, to = to });
            await SendStringAsync(opponentSocket, Newtonsoft.Json.JsonConvert.SerializeObject(serverMessage));
        }

        if(clientMessage.protocol == "PROFILE_PIC")
        {
            Console.WriteLine(clientMessage.data.ToString());
            int pictureIndex = clientMessage.data.pic;
            string playerColor = clientMessage.data.color;
            int matchId = clientMessage.data.matchId;
            MatchDataManager matchData = new MatchDataManager();
            string opponentToken = await matchData.GetOpponentToken(matchId, playerColor);
            WebSocket opponentSocket = manager.GetAllUsersConnected()[opponentToken].websocket;
            MoveMessage serverMessage = new MoveMessage("PROFILE_PIC", new { pic = pictureIndex });
            await SendStringAsync(opponentSocket, Newtonsoft.Json.JsonConvert.SerializeObject(serverMessage));
        }

        if(clientMessage.protocol == "CHECKMATE")
        {
            int matchId = clientMessage.data.matchId;
            string userColor = clientMessage.data.color;
            UserOngoingMatchInfo matchInfo = ongoingMatches.GetAllOngoingMatches()[matchId];
            string opponentToken = matchInfo.player1Token;
            if(token == opponentToken) { opponentToken = matchInfo.player2Token; }
            Session userSession = await Sessions.GetSessionByToken(token, ConnectionStrings.defaultConnectionString);
            Session opponentSession = await Sessions.GetSessionByToken(opponentToken, ConnectionStrings.defaultConnectionString);
            int userId = userSession.userId;
            int opponentId = opponentSession.userId;
            PlayerMatchInfoUpdateManager updateGameInfo = new PlayerMatchInfoUpdateManager();
            await updateGameInfo.UpdateGameInfo(userId, opponentId, userId);
            WebSocket p1Socket = manager.GetAllUsersConnected()[matchInfo.player1Token].websocket;
            WebSocket p2Socket = manager.GetAllUsersConnected()[matchInfo.player2Token].websocket;
            MatchIsOverMessage serverMessage = new MatchIsOverMessage(new MatchIsOverMessageData(userColor));
            await SendStringAsync(p1Socket, Newtonsoft.Json.JsonConvert.SerializeObject(serverMessage));
            await SendStringAsync(p2Socket, Newtonsoft.Json.JsonConvert.SerializeObject(serverMessage));
            manager.GetAllUsersConnected()[token].ongoingMatchId = 0;
            manager.GetAllUsersConnected()[opponentToken].ongoingMatchId = 0;
            ongoingMatches.RemoveOngoingMatch(matchId);
        }

        if(clientMessage.protocol == "CREATE_PRIVATE_GAME")
        {
            // all you need to do is get both players tokens to launch MatchFinder.Pairing(token1, token2) method
           
            // use token as gameKey

        }

        if (clientMessage.protocol == "JOIN_PRIVATE_GAME")
        {

            // the gameKey is the other users token so when its entered simply extract the info from the clientMessage (token) and move on to the pairing method

        }






        }
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        var buffer = Encoding.UTF8.GetBytes(message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
