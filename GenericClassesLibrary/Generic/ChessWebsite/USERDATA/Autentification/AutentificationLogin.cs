﻿using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Autentification;

public class AutentificationLogin
{
    public static async Task<int> CheckCredidentals(string username, string password, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM user_credidentals WHERE userName = '{username}' AND userPassword = '{password}'";
        List<UserLoginInfo> matches = await db.GetData<UserLoginInfo, dynamic>(sql, new { }, connectionString);
        if (matches.Count < 1) return 0;
        return matches[0].userId;
    }

    public static async Task<bool> ChangeUserName(int userId, string newUsername, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"UPDATE user_credidentals SET userName = '{newUsername}' WHERE userId = {userId}";
        await db.SaveData(sql, new { }, connectionString);
        return true;
    }
}
