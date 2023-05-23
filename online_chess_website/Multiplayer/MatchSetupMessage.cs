namespace online_chess_website.Multiplayer;

public class MatchSetupMessage
{
    public string color {get; set;}
    public int MATCH_ID { get; set;}

    public MatchSetupMessage(string color, int MATCH_ID)
    {
        this.color = color;
        this.MATCH_ID = MATCH_ID;
    }
}
