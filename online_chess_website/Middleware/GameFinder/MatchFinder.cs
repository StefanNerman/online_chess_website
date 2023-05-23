using Microsoft.AspNetCore.Identity;
using online_chess_website.Middleware.Websocket;
using online_chess_website.Multiplayer;
using System.Linq;
using System.Net.WebSockets;
using System.Text;

namespace online_chess_website.Middleware.GameFinder;

public class MatchFinder
{
    private QuemodeManager _queManager;
    private WebsocketConnectionManager _websocketConnectionManager;

    public MatchFinder(QuemodeManager queManager, WebsocketConnectionManager websocketConnectionManager)
    {
        _queManager = queManager;
        _websocketConnectionManager = websocketConnectionManager;
    }

    private TokenRankPair[] FormatQueData()
    {
        var que = _queManager.GetUserQueData().ToArray();
        TokenRankPair[] tokenRankPairs = new TokenRankPair[que.Length];
        for (var i = 0; i < que.Length; i++)
        {
            var queUser = que[i];
            tokenRankPairs[i] = new TokenRankPair(queUser.Key, queUser.Value.userRank);
        }
        return tokenRankPairs;
    }

    private static Timer mainTimer;
    public void LaunchProcess()
    {
        Console.WriteLine("MatchFinder launched");
        mainTimer = new Timer(FindMatches, null, 1000, 2000);
    }

    private async Task FindMatches(Object stateInfo)
    {
        TokenRankPair[] pairs = FormatQueData();
        for (int i = 0; i < pairs.Length; i++)
        {
            TokenRankPair pair = pairs[i];
            for(int j = 0; j < pairs.Length; j++)
            {
                if (pairs[j] == null || pairs[i] == null) { continue; }
                TokenRankPair nestedPair = pairs[j];
                if(pair != nestedPair)
                {
                    int dif = pair.Rank - nestedPair.Rank;
                    if(dif < 0) { dif = dif * -1; }
                    if (dif < 200) {
                        Console.WriteLine($"Players paired: {pair.Token} {pair.Rank} and {nestedPair.Token} {nestedPair.Rank}");
                        pairs[i] = null;
                        pairs[j] = null;
                        _queManager.RemoveUserFromQue(pair.Token);
                        _queManager.RemoveUserFromQue(nestedPair.Token);
                        await Pairing(pair.Token, nestedPair.Token);
                        break;
                    }
                }
            }
        }
        return;
    }

    private async Task Pairing(string token, string nestedToken)
    {
        MatchSetup setup = new MatchSetup();
        string[] matchSetupInfoMessage = await setup.CreateMatch(token, nestedToken);
        WebSocket p1Socket = _websocketConnectionManager.GetAllUsersConnected()[token];
        WebSocket p2Socket = _websocketConnectionManager.GetAllUsersConnected()[nestedToken];
        await SendStringAsync(p1Socket, matchSetupInfoMessage[0]);
        await SendStringAsync(p2Socket, matchSetupInfoMessage[1]);
    }

    private async Task SendStringAsync(WebSocket socket, string message)
    {
        Console.WriteLine(message);
        var buffer = Encoding.UTF8.GetBytes("STRING MESSAGE: " + message);
        await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
