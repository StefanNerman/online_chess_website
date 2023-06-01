namespace online_chess_website.Multiplayer;

public class UserOngoingMatchInfo
{
    public int matchId { get; set; }
    public string player1Token { get; set; }
    public string player2Token { get; set; }

    public UserOngoingMatchInfo(int matchId, string player1Token, string player2Token)
    {
        this.matchId = matchId;
        this.player1Token = player1Token;
        this.player2Token = player2Token;
    }
}
