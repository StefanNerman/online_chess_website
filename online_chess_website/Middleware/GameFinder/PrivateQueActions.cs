using System.Collections.Concurrent;

namespace online_chess_website.Middleware.GameFinder;

public class PrivateQueActions
{
    private readonly PrivateQueManager _manager;

    public PrivateQueActions(PrivateQueManager manager)
    {
        _manager = manager;
    }

    public ConcurrentDictionary<string, UserQuedata> GetAllEntries() { return _manager.GetPrivateQueUserData(); }

    public bool AddUserToQue(string token, UserQuedata quedata)
    {
        return _manager.AddUserToQue(token, quedata);
    }

    public bool RemoveUserFromQue(string token)
    {
        return _manager.RemoveUserFromQue(token);
    }
}
