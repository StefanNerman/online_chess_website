using System.Collections.Concurrent;

namespace online_chess_website.Middleware.GameFinder;

public class PrivateQueManager
{
    private ConcurrentDictionary<string, UserQuedata> usersInPrivateQue = new ConcurrentDictionary<string, UserQuedata>();

    public ConcurrentDictionary<string, UserQuedata> GetPrivateQueUserData() { return usersInPrivateQue; }

    public bool AddUserToQue(string token, UserQuedata userQuedata)
    {
        return usersInPrivateQue.TryAdd(token, userQuedata);
    }

    public bool RemoveUserFromQue(string token)
    {
        return usersInPrivateQue.TryRemove(token, out UserQuedata quedata);
    }
}
