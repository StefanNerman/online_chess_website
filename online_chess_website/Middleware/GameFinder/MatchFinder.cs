namespace online_chess_website.Middleware.GameFinder;

public class MatchFinder
{
    private QuemodeManager _queManager;

    public MatchFinder(QuemodeManager queManager)
    {
        _queManager = queManager;
    }

    public void FindMatches(Object stateInfo)
    {
        Console.WriteLine("Timer ideration");
        Console.WriteLine(_queManager.GetUserQueData().Keys.Count);
        //loop through the usersinque if find match launch functions without awaiting them 
        //if no matches, return
    }

    private static Timer mainTimer;
    public void LaunchProcess()
    {
        Console.WriteLine("MatchFinder launched");
        mainTimer = new Timer(FindMatches, null, 1000, 4000);
    }
}
