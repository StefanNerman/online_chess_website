using System.Collections.Concurrent;

namespace online_chess_website.Middleware.GameFinder;

public class QuemodeManager
{

    private ConcurrentDictionary<string, UserQuedata> usersInQuemode = new ConcurrentDictionary<string, UserQuedata>();

    public ConcurrentDictionary<string, UserQuedata> GetUserQueData() { return usersInQuemode; }

    public void AddUserToQue(string token, UserQuedata userQuedata)
    {
        usersInQuemode.TryAdd(token, userQuedata);
    }
}
