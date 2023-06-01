namespace online_chess_website.Multiplayer;

public class MatchIsOverMessageData
{
    public string winner { get; set; }
    
    public MatchIsOverMessageData(string winner){ this.winner = winner; }
}
