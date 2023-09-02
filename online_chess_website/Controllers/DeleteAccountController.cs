using GenericClassesLibrary.DataAccess;
using Microsoft.AspNetCore.Mvc;
using online_chess_website.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace online_chess_website.Controllers;

[Route("api/account_delete")]
[ApiController]
public class DeleteAccountController : ControllerBase
{
    [HttpGet("{id}")]
    public async  Task<bool> Get(int id)
    {

        MySQL db = new MySQL();
        string sqlGamedata = $"DELETE FROM user_gamedata WHERE id = {id}";
        db.DeleteData(sqlGamedata, new { }, ConnectionStrings.defaultConnectionString);

        string sqlProfile = $"DELETE FROM profiles WHERE userId = {id}";
        db.DeleteData(sqlProfile, new { }, ConnectionStrings.defaultConnectionString);

        string sql = $"DELETE FROM user_credidentals WHERE userId = {id}";
        db.DeleteData(sql, new { }, ConnectionStrings.defaultConnectionString);

        return true;
    }
}
