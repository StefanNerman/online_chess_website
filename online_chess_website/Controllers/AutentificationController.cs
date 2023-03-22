using Microsoft.AspNetCore.Mvc;


namespace online_chess_website.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AutentificationController : ControllerBase
{
    // GET: api/<AutentificationController>
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<AutentificationController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<AutentificationController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<AutentificationController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<AutentificationController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
