namespace online_chess_website.Multiplayer;

public class MatchSetupReturnInfo
{
    public string[] strings { get; set; }
    public int matchId { get; set; }

    public MatchSetupReturnInfo(string[] strings, int matchId)
    {
        this.strings = strings;
        this.matchId = matchId;
    }
}
