using Microsoft.AspNetCore.Mvc;
using GenericClassesLibrary.Interface;
using System.Text.Json;
using Newtonsoft.Json;
using online_chess_website.Data;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Autentification;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.UserGamedata;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;

namespace online_chess_website.Controllers;

[Route("api/signup")]
[ApiController]
public class SignupController : ControllerBase
{

    [HttpPost]
    public async Task<int> Post([FromBody] JsonElement data)
    {
        LoginSignupData? loginData = JsonConvert.DeserializeObject<LoginSignupData>(data.ToString());
        if(loginData != null)
        {
            string connectionString = ConnectionStrings.defaultConnectionString;
            int result = await AutentificationSignup.CreateNewUser(loginData.username, loginData.password, connectionString);
            ProfileManager pm = new ProfileManager();
            pm.CreateProfile(result, connectionString);

            /*
            IProfileInfo profile = await pm.GetProfile(result, connectionString);
            UserProfileData sendData = new UserProfileData(result, profile);
            */

            UserGamedataManager.CreateGamedata(result);

            return result;
        }
        return 0;
    }

    [HttpGet("{username}")]
    public async Task<bool> Get(string username)
    {
        if(username == "")
        {
            return true;
        }
        string connectionString = ConnectionStrings.GetString("defaultString");
        bool result = await AutentificationSignup.IsUsernameFree(username, connectionString);
        return result;
    }
}
