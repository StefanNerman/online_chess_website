


namespace online_chess_website.Middleware.GameFinder;

public class UserQuedata
{
    public string userToken { get; set; }
    public int userId { get; set; }
    public int userRank { get; set; }

    public UserQuedata(string userToken, int userId, int userRank)
    {
        this.userToken = userToken;
        this.userId = userId;
        this.userRank = userRank;
    }
}
