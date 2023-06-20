namespace online_chess_website.Multiplayer;

public class MatchSetupMessageData
{
    public string color { get; set; }
    public int MATCH_ID { get; set; }
    public string opponentName { get; set; }
    public int opponentRank { get; set; }

    public MatchSetupMessageData(string color, int MATCH_ID, string opponentName, int opponentRank)
    {
        this.color = color; 
        this.MATCH_ID = MATCH_ID;   
        this.opponentName = opponentName;
        this.opponentRank = opponentRank;
    }
}
