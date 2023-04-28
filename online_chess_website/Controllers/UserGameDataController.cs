using GenericClassesLibrary.Generic.ChessWebsite;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json;

namespace online_chess_website.Controllers;

[Route("api/user_game_data")]
[ApiController]
public class UserGameDataController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<UserGamedata> Get(int id)
    {
        UserGamedata gamedata = await UserGamedataManager.GetGamedata(id);
        return gamedata;
    }


    [Route("update")]
    [HttpPost]
    public void Post([FromBody] JsonElement data)
    { 
        UpdateUserGamedata? loginData = JsonConvert.DeserializeObject<UpdateUserGamedata>(data.ToString());
        if(loginData== null)
        {
            return;
        }
        UserGamedataManager.UpdateGamedata(loginData);
    }
}
