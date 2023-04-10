using Microsoft.AspNetCore.Mvc;
using GenericClassesLibrary.Interface;
using System.Text.Json;
using Newtonsoft.Json;
using GenericClassesLibrary.Generic.ChessWebsite;

namespace online_chess_website.Controllers;

[Route("api/signup")]
[ApiController]
public class SignupController : ControllerBase
{

    [HttpPost]
    public bool Post([FromBody] JsonElement data)
    {
        LoginSignupData? loginData = JsonConvert.DeserializeObject<LoginSignupData>(data.ToString());
        if(loginData != null)
        {
            return AutentificationSignup.CreateNewUser(loginData);
        }
        return false;
    }

    [HttpGet("{username}")]
    public bool Get(string username)
    {
        return AutentificationSignup.IsUsernameFree(username);
    }
}
