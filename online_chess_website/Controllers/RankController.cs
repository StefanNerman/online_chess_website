using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Rating;
using GenericClassesLibrary.Generic.ChessWebsite.utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using online_chess_website.Data;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace online_chess_website.Controllers;

[Route("api/rating")]
[ApiController]
public class RankController : ControllerBase
{
    [Route("update")]
    [HttpPost]
    public void Post([FromBody] JsonElement data)
    {
        UpdateRankData clientData = JsonConvert.DeserializeObject<UpdateRankData>(data.ToString());
        if(clientData != null)
        {
            int newRank = PlayerRankCalculator.Calculate(clientData.rank, clientData.opponentRank, clientData.gameResult);
            ProfileManager pm = new ProfileManager();
            string connectionString = ConnectionStrings.defaultConnectionString;
            pm.UpdateProfile(clientData.userId, newRank, "", connectionString);
        }
    }
}
