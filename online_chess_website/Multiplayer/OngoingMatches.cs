using System.Collections.Concurrent;

namespace online_chess_website.Multiplayer;

public class OngoingMatches
{
    private ConcurrentDictionary<int, UserOngoingMatchInfo> ongoingMatches = new ConcurrentDictionary<int, UserOngoingMatchInfo>();

    public ConcurrentDictionary<int, UserOngoingMatchInfo> GetAllOngoingMatches() { return ongoingMatches; }
    public bool AddOngoingMatch(int matchId, string player1Token, string player2Token)
    {
        return ongoingMatches.TryAdd(matchId, new UserOngoingMatchInfo(matchId, player1Token, player2Token));
    }

    public bool RemoveOngoingMatch(int matchId)
    {
        return ongoingMatches.TryRemove(matchId, out UserOngoingMatchInfo matchInfo);
    }
}
