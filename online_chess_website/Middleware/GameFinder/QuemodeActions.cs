﻿


namespace online_chess_website.Middleware.GameFinder;

public class QuemodeActions
{
    private readonly QuemodeManager _manager;

    public QuemodeActions(QuemodeManager manager)
    {
        _manager = manager;
    }

    public void AddUserToQue(UserQuedata quedata)
    {
        Console.WriteLine(quedata.ToString());
    }
}
