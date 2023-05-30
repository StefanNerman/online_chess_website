namespace online_chess_website.Multiplayer;

public class MoveMessage
{
    public string protocol { get; set; }
    public Object data { get; set; }

    public MoveMessage(string protocol, Object data)
    {
        this.protocol = protocol;
        this.data = data;
    }
}
