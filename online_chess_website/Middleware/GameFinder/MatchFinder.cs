


namespace online_chess_website.Middleware.GameFinder;

public class MatchFinder
{
    private QuemodeManager _queManager;

    public MatchFinder(QuemodeManager queManager)
    {
        _queManager = queManager;
    }

    public void LaunchProcess()
    {
        Console.WriteLine("MatchFinder launched");
        //await for another method that contains a while loop
    }
}
