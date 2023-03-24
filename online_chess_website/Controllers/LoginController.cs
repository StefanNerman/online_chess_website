using GenericClassesLibrary;
using GenericClassesLibrary.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json;

namespace online_chess_website.Controllers;

[Route("api/login")]
[ApiController]
public class LoginController : ControllerBase
{
    /*
    //TO DELETE
    [HttpGet("{username}/{password}")]
    public bool Get(string username, string password)
    {
        Console.WriteLine(username + ":" + password);
        return false : true
    }
    */

    [HttpPost]
    public bool Post([FromBody] JsonElement data)
    {
        LoginSignupData? loginData = JsonConvert.DeserializeObject<LoginSignupData>(data.ToString());
        if (loginData != null)
        {
            return AutentificationLogin.CheckCredidentals(loginData.username, loginData.password);
        }
        return false;
    }
}
