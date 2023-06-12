using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Sessions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using online_chess_website.Data;
using System.Text.Json;

namespace online_chess_website.Controllers;

[Route("api/sessions")]
[ApiController]
public class SessionsController : ControllerBase
{
    [Route("delete")]
    [HttpPost]
    public void Post([FromBody] JsonElement data)
    {
        DeleteSessionRequestData? requestData = JsonConvert.DeserializeObject<DeleteSessionRequestData>(data.ToString());
        if (requestData != null)
        {
            string connectionString = ConnectionStrings.GetString("defaultString");
            if(requestData.userId != null)
            {
                int userId = int.Parse(requestData.userId);
                Sessions.DeleteSession(userId, connectionString);
            }
        }
    }

    [HttpGet("{id}")]
    public async Task<string> Get(int id)
    {
        string connectionString = ConnectionStrings.GetString("defaultString");
        string output = await Sessions.CreateSession(id, connectionString);
        //there was a bug where it wouldn't send the entire string and putting it in an object fixed it
        return Newtonsoft.Json.JsonConvert.SerializeObject(new token1(output));
    }

}
public class token1
{
    public string token;
    public token1(string var1)
    {
        token = var1;
    }
}