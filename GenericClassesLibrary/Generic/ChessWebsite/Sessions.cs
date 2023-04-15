﻿using GenericClassesLibrary.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite;

public static class Sessions
{
    public static async Task<long> CreateSession(int id, string connectionString)
    {
        Random random = new Random();
        long sessionNumber = random.NextInt64();
        MySQL db = new MySQL();
        DateTime dt = DateTime.Now;
        string time = dt.ToString("mmHHddMMyy");
        string sql = $"INSERT INTO sessions (userId, session_token, session_start) VALUES ({id.ToString()}, {sessionNumber.ToString()}, {time})";
        await db.SaveData(sql, new { }, connectionString);
        return sessionNumber;
    }

    public static void DeleteSession(int userId, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"DELETE FROM sessions WHERE userId = {userId}";
        db.DeleteData(sql, new { }, connectionString);
    }
}
