using GenericClassesLibrary;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Autentification;
using GenericClassesLibrary.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using online_chess_website.Data;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace online_chess_website.Controllers;

[Route("api/login")]
[ApiController]
public class LoginController : ControllerBase
{

    [HttpPost]
    public async Task<int> Post([FromBody] JsonElement data)
    {
        LoginSignupData? loginData = JsonConvert.DeserializeObject<LoginSignupData>(data.ToString());
        if (loginData != null)
        {
            string connectionString = ConnectionStrings.GetString("defaultString");
            int result = await AutentificationLogin.CheckCredidentals(loginData.username, loginData.password, connectionString);

            /*
            ProfileManager pm = new ProfileManager();
            IProfileInfo profile = await pm.GetProfile(result, connectionString);
            UserProfileData sendData = new UserProfileData(result, profile);
            */

            return result;
        }
        return 0;
    }

    [HttpGet("{id_and_name}")]

    public async Task<bool> ChangeUsername(string id_and_name)
    {
        string[] words = id_and_name.Split(":");

        int userId = int.Parse(words[0]);
        string newName = words[1];

        return await AutentificationLogin.ChangeUserName(userId, newName, ConnectionStrings.GetString("defaultString"));
    }
}
