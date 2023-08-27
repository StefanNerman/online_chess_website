using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace online_chess_website.Controllers;

[Route("api/change_password")]
[ApiController]
public class ChangePasswordController : ControllerBase
{
    [HttpGet("{id_and_password}")]
    public async Task<bool> Get(string id_and_password)
    {
        Console.WriteLine("=======> " + id_and_password);
        string[] words = id_and_password.Split(":");

        int userId = int.Parse(words[0]);
        string newName = words[1];

        return false;
    }
}
