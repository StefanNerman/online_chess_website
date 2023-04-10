using GenericClassesLibrary;
using GenericClassesLibrary.Generic.ChessWebsite;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json;

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
            int result = await AutentificationLogin.CheckCredidentals(loginData.username, loginData.password);
            return result;
        }
        return 0;
    }
}
