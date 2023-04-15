using GenericClassesLibrary.Generic.ChessWebsite;
using GenericClassesLibrary.Interface;
using Microsoft.AspNetCore.Mvc;
using online_chess_website.Data;

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
}
