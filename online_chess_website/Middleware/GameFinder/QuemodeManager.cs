using System.Collections.Concurrent;

namespace online_chess_website.Middleware.GameFinder;

public class QuemodeManager
{

    private ConcurrentDictionary<string, UserQuedata> usersInQuemode = new ConcurrentDictionary<string, UserQuedata>();

    public ConcurrentDictionary<string, UserQuedata> GetUserQueData() { return usersInQuemode; }

    public bool AddUserToQue(string token, UserQuedata userQuedata)
    {
        return usersInQuemode.TryAdd(token, userQuedata);
    }

    public bool RemoveUserFromQue(string token)
    {
        return usersInQuemode.TryRemove(token, out UserQuedata quedata);
    }
}
