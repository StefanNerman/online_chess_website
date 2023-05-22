


namespace online_chess_website.Middleware.GameFinder;

public class QuemodeActions
{
    private readonly QuemodeManager _manager;

    public QuemodeActions(QuemodeManager manager)
    {
        _manager = manager;
    }

    public bool AddUserToQue(string token, UserQuedata quedata)
    {
        return _manager.AddUserToQue(token, quedata);
    }

    public bool RemoveUserFromQue(string token)
    {
        return _manager.RemoveUserFromQue(token);
    }
}
