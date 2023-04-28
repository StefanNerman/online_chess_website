﻿using GenericClassesLibrary.DataAccess;
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
    public async Task<long> Get(int id)
    {
        string connectionString = ConnectionStrings.GetString("defaultString");
        long output = await Sessions.CreateSession(id, connectionString);
        return output;
    }

}