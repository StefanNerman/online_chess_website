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
using Mysqlx;

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

        //================================== !!!!! NOTE  =========================== user websocket connection isnt removed properly when refreshing FIX!!!
        //                                                                           problem might be in WebsocketConnection.cs line 62


        if(clientMessage.protocol == "CREATE_PRIVATE_MATCH")
        {
                // all you need to do is get both players tokens to launch MatchFinder.Pairing(token1, token2) method

                // use token as gameKey
            UserQuedata userQuedata = new UserQuedata(321, 123);
            Console.WriteLine(userQuedata.GetType());
            privateQueActions.AddUserToQue(token, userQuedata);
            WebSocket socket = manager.GetAllUsersConnected()[token].websocket;
            await SendStringAsync(socket, Newtonsoft.Json.JsonConvert.SerializeObject(new { protocol = "SUCCESS" }));
        }

        if (clientMessage.protocol == "JOIN_PRIVATE_MATCH")
        {
                // the gameKey is the other users token so when its entered simply extract the info from the clientMessage (token) and move on to the pairing method

            string key = clientMessage.data.gameKey;

            int oppnentExists = privateQueActions.GetAllEntries()[key].userRank;
            if(oppnentExists == 123)
            {
                await PrivatePairing(token, key, manager, ongoingMatches);
            }
            else
            {
                Console.WriteLine("private game failed");
                WebSocket socket = manager.GetAllUsersConnected()[token].websocket;
                await SendStringAsync(socket, Newtonsoft.Json.JsonConvert.SerializeObject(new { protocol = "FAILURE" }));
            }
        }






      }
    }

    private async Task PrivatePairing(string p1Token, string p2Token, WebsocketConnectionManager manager, OngoingMatches ongoing)
    {
        MatchSetup setup = new MatchSetup();
        MatchSetupReturnInfo matchSetupInfo = await setup.CreateMatch(p1Token, p2Token);

        string[] matchSetupInfoMessage = matchSetupInfo.strings;
        WebSocket p1Socket = manager.GetAllUsersConnected()[p1Token].websocket;
        manager.GetAllUsersConnected()[p1Token].ongoingMatchId = matchSetupInfo.matchId;
        WebSocket p2Socket = manager.GetAllUsersConnected()[p2Token].websocket;
        manager.GetAllUsersConnected()[p2Token].ongoingMatchId = matchSetupInfo.matchId;
        ongoing.AddOngoingMatch(matchSetupInfo.matchId, p1Token, p2Token);

        Console.WriteLine(matchSetupInfoMessage[0]);
        Console.WriteLine(matchSetupInfoMessage[1]);
        await SendStringAsync(p1Socket, matchSetupInfoMessage[0]);
        await SendStringAsync(p2Socket, matchSetupInfoMessage[1]);
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        var buffer = Encoding.UTF8.GetBytes(message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
