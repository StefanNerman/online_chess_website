


namespace online_chess_website.Middleware.GameFinder;

public class UserQuedata
{
    public string userToken { get; set; }
    public string userId { get; set; }
    public int userRank { get; set; }

    public UserQuedata(string userToken, string userId, int userRank)
    {
        this.userToken = userToken;
        this.userId = userId;
        this.userRank = userRank;
    }
}
