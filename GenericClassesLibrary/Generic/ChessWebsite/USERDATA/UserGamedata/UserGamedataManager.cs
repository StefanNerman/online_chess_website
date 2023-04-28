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
        return new UserGamedata(1, 3, 1, 1, 1);
    }
    public static async void UpdateGamedata(UpdateUserGamedata newData, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"UPDATE user_gamedata SET games_total = games_total + 1, games_won = games_won + {newData.wins}, games_lost = games_lost + {newData.losses}, draws = draws + {newData.draws}";
        db.SaveData(sql, new { }, connectionString);
    }

    public static async void CreateGamedata(int id, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"INSERT INTO user_gamedata (id, games_total, games_won, games_lost, draws) VALUES ({id}, 0, 0, 0, 0)";
        db.SaveData(sql, new { }, connectionString);
    }
}
