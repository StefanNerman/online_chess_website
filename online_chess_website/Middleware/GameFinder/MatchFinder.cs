using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace online_chess_website.Middleware.GameFinder;

public class MatchFinder
{
    private QuemodeManager _queManager;

    public MatchFinder(QuemodeManager queManager)
    {
        _queManager = queManager;
    }

    private void FindMatches(Object stateInfo)
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
                        break;
                    }
                }
            }
        }
        return;
    }

    private TokenRankPair[] FormatQueData()
    {
        var que = _queManager.GetUserQueData().ToArray();
        TokenRankPair[] tokenRankPairs = new TokenRankPair[que.Length];
        for(var i = 0;i < que.Length; i++)
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
}
