


namespace online_chess_website.Middleware.GameFinder;

public class QuemodeActions
{
    private readonly QuemodeManager _manager;

    public QuemodeActions(QuemodeManager manager)
    {
        _manager = manager;
    }

    public void Run()
    {
        Console.WriteLine(_manager.val1 + _manager.val2);
    }
}
