

namespace online_chess_website.Middleware.GameFinder;

public class TokenRankPair
{
    public string Token { get; set; }
    public int Rank { get; set; }
    public TokenRankPair(string token, int rank)
    {
        Token = token;
        Rank = rank;
    }
}
