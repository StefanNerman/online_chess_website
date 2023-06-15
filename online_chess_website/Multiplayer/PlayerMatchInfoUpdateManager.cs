using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;
using GenericClassesLibrary.Generic.ChessWebsite.utils;
using GenericClassesLibrary.Interface;
using online_chess_website.Data;

namespace online_chess_website.Multiplayer;

public class PlayerMatchInfoUpdateManager
{
    public async Task UpdateGameInfo(int p1Id, int p2Id, int winner)
    {
        Console.WriteLine("===> " + p1Id + " " + p2Id + " ::: " + winner);
        string connectionString = ConnectionStrings.defaultConnectionString;
        MySQL db = new MySQL();
        string sqlUpdateGamedata = $"UPDATE user_gamedata SET games_total = games_total + 1, games_won = games_won + 1 WHERE id = {winner}";
        await db.SaveData(sqlUpdateGamedata, new { }, connectionString);
        int loserId = p1Id;
        if(p1Id == winner) { loserId = p2Id; }
        sqlUpdateGamedata = $"UPDATE user_gamedata SET games_total = games_total + 1, games_lost = games_lost + 1 WHERE id = {loserId}";
        await db.SaveData(sqlUpdateGamedata, new { }, connectionString);

        ProfileManager pm = new ProfileManager();
        IProfileInfo winnerProfile = await pm.GetProfile(winner, connectionString);
        IProfileInfo loserProfile = await pm.GetProfile(loserId, connectionString);
        int winnerRank = PlayerRankCalculator.Calculate(winnerProfile.userRank, loserProfile.userRank, 1);
        int loserRank = PlayerRankCalculator.Calculate(loserProfile.userRank, winnerProfile.userRank, 0);
        pm.UpdateProfile(winner, winnerRank, "", connectionString);
        pm.UpdateProfile(loserId, loserRank, "", connectionString);
    }
}
