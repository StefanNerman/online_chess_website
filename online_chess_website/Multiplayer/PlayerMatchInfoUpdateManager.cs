namespace online_chess_website.Multiplayer;

public class PlayerMatchInfoUpdateManager
{
    public async Task UpdateGameInfo(int p1Id, int p2Id, int winner)
    {
        Console.WriteLine("===> " + p1Id + " " + p2Id + " ::: " + winner);

    }
}
