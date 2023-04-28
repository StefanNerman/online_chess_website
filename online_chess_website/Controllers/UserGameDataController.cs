using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.UserGamedata;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using online_chess_website.Data;
using System.Text.Json;

namespace online_chess_website.Controllers;

[Route("api/user_game_data")]
[ApiController]
public class UserGameDataController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<UserGamedata> Get(int id)
    {
        string connectionString = ConnectionStrings.defaultConnectionString;
        UserGamedata gamedata = await UserGamedataManager.GetGamedata(id, connectionString);
        return gamedata;
    }


    [Route("update")]
    [HttpPost]
    public void Post([FromBody] JsonElement data)
    { 
        UpdateUserGamedata? loginData = JsonConvert.DeserializeObject<UpdateUserGamedata>(data.ToString());
        if(loginData == null)
        {
            return;
        }
        string connectionString = ConnectionStrings.defaultConnectionString;
        UserGamedataManager.UpdateGamedata(loginData, connectionString);
    }
}
