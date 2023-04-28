using GenericClassesLibrary.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.UserGamedata;

public static class UserGamedataManager
{
    public static async Task<UserGamedata> GetGamedata(int id, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM user_gamedata WHERE id = {id}";
        List<UserGamedata> gamedata = await db.GetData<UserGamedata, dynamic>(sql, new { }, connectionString);
        return gamedata[0];
    }
    public static async void UpdateGamedata(UpdateUserGamedata newData, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"UPDATE user_gamedata SET games_total = games_total + 1, games_won = games_won + {newData.wins}, games_lost = games_lost + {newData.losses}, draws = draws + {newData.draws}";
        await db.SaveData(sql, new { }, connectionString);
    }

    public static async void CreateGamedata(int id, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"INSERT INTO user_gamedata (id, games_total, games_won, games_lost, draws) VALUES ({id}, 0, 0, 0, 0)";
        await db.SaveData(sql, new { }, connectionString);
    }
}
