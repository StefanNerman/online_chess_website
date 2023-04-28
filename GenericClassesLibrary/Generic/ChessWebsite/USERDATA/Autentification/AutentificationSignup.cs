using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Autentification;

public class AutentificationSignup
{
    public static async Task<int> CreateNewUser(string username, string password, string connectionString)
    {
        MySQL db = new MySQL();
        string sqlInsert = $"INSERT INTO user_credidentals (userName, userPassword) VALUES ('{username}', '{password}')";
        await db.SaveData(sqlInsert, new { }, connectionString);
        string sqlSelect = $"SELECT * FROM user_credidentals WHERE userName = '{username}' AND userPassword = '{password}'";
        List<UserLoginInfo> result = await db.GetData<UserLoginInfo, dynamic>(sqlSelect, new { }, connectionString);
        return result[0].userId;
    }

    public static async Task<bool> IsUsernameFree(string username, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM user_credidentals WHERE userName = '{username}'";
        List<UserLoginInfo> result = await db.GetData<UserLoginInfo, dynamic>(sql, new { }, connectionString);
        if (result.Count > 0) { return false; }
        return true;
    }
}
