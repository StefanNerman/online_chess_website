


namespace online_chess_website.Middleware.GameFinder;

public class QuemodeManager
{
    public int val1 { get; set; }
    public int val2 { get; set; }
    public QuemodeManager()
    {
        val1 = Random.Shared.Next(1, 888);
        val2 = Random.Shared.Next(1, 888);
    }
}
