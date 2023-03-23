using GenericClassesLibrary.Generic;
using Microsoft.AspNetCore.Mvc;



namespace online_chess_website.Controllers;

[Route("api/login")]
[ApiController]
public class LoginController : ControllerBase
{
    [HttpGet("{username, password}")]
    public bool Get(string username, string password)
    {
        bool credidentialsCheckResult =  AutentificationLogin.CheckCredidentals(username, password);
        return credidentialsCheckResult;
    }
}
