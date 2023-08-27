using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using Microsoft.AspNetCore.Mvc;
using online_chess_website.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace online_chess_website.Controllers;

[Route("api/change_password")]
[ApiController]
public class ChangePasswordController : ControllerBase
{
    [HttpGet("{id_and_password}")]
    public async Task<int> Get(string id_and_password)
    {
        string[] words = id_and_password.Split(":");

        int userId = int.Parse(words[0]);
        string newPassword = words[1];

        bool passwordCheck = await CompareOldPassword(userId, newPassword, ConnectionStrings.GetString("defaultString"));

        if (!passwordCheck)
        {
            return 0;
        }

        bool changeStatus = await ChangePassword(userId, newPassword, ConnectionStrings.GetString("defaultString"));

        if (!changeStatus)
        {
            return 1;
        }

        return 2;
    }

    async Task<bool> ChangePassword(int userId, string newPassword, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"UPDATE user_credidentals SET userPassword = '{newPassword}' WHERE userId = {userId}";
        await db.SaveData(sql, new { }, connectionString);
        return true;
    }

    async Task<bool> CompareOldPassword(int userId, string newPassword, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM user_credidentals WHERE userId = {userId}";
        List<UserLoginInfo> data = await db.GetData<UserLoginInfo, dynamic>(sql, new { }, connectionString);
        if (data[0].userPassword == newPassword)
        {
            return false;
        }
        return true;
    }
}
