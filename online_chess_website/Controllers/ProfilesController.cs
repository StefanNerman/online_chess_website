using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.UserGamedata;
using GenericClassesLibrary.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using online_chess_website.Data;
using System.Text.Json;

namespace online_chess_website.Controllers;

[Route("api/profiles")]
[ApiController]
public class ProfilesController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IProfileInfo> Get(int id)
    {
        string connectionString = ConnectionStrings.defaultConnectionString;
        ProfileManager pm = new ProfileManager();
        IProfileInfo profile = await pm.GetProfile(id, connectionString);
        return profile;
    }

    [Route("update")]
    [HttpPost]
    public void Post([FromBody] JsonElement data)
    {
        ProfileInfo? loginData = JsonConvert.DeserializeObject<ProfileInfo>(data.ToString());
        if (loginData == null)
        {
            return;
        }
        string connectionString = ConnectionStrings.defaultConnectionString;
        ProfileManager pm = new ProfileManager();
        pm.UpdateProfile(loginData.userId, loginData.userRank, loginData.profilePicture, connectionString);
    }
}
