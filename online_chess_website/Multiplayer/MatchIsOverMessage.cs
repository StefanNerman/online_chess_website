namespace online_chess_website.Multiplayer;

public class MatchIsOverMessage
{
    public string protocol = "MATCH_ENDED";
    public MatchIsOverMessageData data { get; set; }

    public MatchIsOverMessage(MatchIsOverMessageData data)
    {
        this.data = data;
    }
}
