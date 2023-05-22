using Microsoft.AspNetCore.Identity;

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
        Console.WriteLine("MatchFinder ideration");
        TokenRankPair[] queUsers = FormatQueData();
        foreach (var queUser in queUsers)
        {
            foreach(var nestedQueUser in queUsers)
            {
                if(nestedQueUser.Token != queUser.Token)
                {
                    int rankDifference = nestedQueUser.Rank - queUser.Rank;
                    if(rankDifference < 0) { rankDifference = rankDifference * -1; }
                    if(rankDifference > 200) { 
                        //mach the users up
                        //mach the users up
                    }
                }
            }
        }
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
        mainTimer = new Timer(FindMatches, null, 1000, 4000);
    }
}
