namespace online_chess_website.Multiplayer;

public class MatchSetupMessage
{
    public string protocol { get; set; }
    public MatchSetupMessageData data { get; set; }

    public MatchSetupMessage(string protocol, MatchSetupMessageData data)
    {
        this.protocol = protocol;
        this.data = data;
    }
}
