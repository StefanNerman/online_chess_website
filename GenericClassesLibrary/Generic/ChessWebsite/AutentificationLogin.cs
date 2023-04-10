using GenericClassesLibrary.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite;

public class AutentificationLogin
{
    public static async Task<int> CheckCredidentals(string username, string password)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM user_credidentals WHERE userName = {username} AND userPassword = {password}";

        //FIND A WAY TO ACCESS THE APPSETTINGS.JSON FILE TO GET THE CONNECTIONSTRING AND PASS IT INTO THIS FUNCTION AS PARAM FROM THE CONTROLLER

        List<UserLoginInfo> matches = await db.GetData<UserLoginInfo, dynamic>(sql, new { }, );
        if(matches.Count < 1) return 0;
        //return List[0].userId
        return 1;
    }
}
