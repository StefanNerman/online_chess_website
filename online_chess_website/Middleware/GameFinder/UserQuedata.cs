


namespace online_chess_website.Middleware.GameFinder;

public class UserQuedata
{
    public int userId { get; set; }
    public int userRank { get; set; }

    public UserQuedata(int userId, int userRank)
    {
        this.userId = userId;
        this.userRank = userRank;
    }
}
