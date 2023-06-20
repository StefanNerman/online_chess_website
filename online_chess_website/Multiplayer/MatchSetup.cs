using GenericClassesLibrary.DataAccess;
using online_chess_website.Data;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Sessions;
using GenericClassesLibrary.Interface;
using GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;

namespace online_chess_website.Multiplayer;

public class MatchSetup
{
    public async Task<MatchSetupReturnInfo> CreateMatch(string p1Token, string p2Token)
    {
        int p1Color = Random.Shared.Next(0, 1);
        int p2Color = 0;
        if(p1Color == 0) { p2Color = 1; }

        MySQL db = new MySQL();
        string connectionString = ConnectionStrings.defaultConnectionString;
        Session p1Opt = await Sessions.GetSessionByToken(p2Token, connectionString);
        Session p2Opt = await Sessions.GetSessionByToken(p1Token, connectionString);
        ProfileManager pm = new ProfileManager();
        IProfileInfo p1OptProfile = await pm.GetProfile(p1Opt.userId, connectionString);
        IProfileInfo p2OptProfile = await pm.GetProfile(p2Opt.userId, connectionString);
        List<IUserCredidentalInfo> p1OptCredidentals = await db.GetData<IUserCredidentalInfo, dynamic>(
                        $"SELECT * FROM user_credidentals WHERE userId = {p1Opt.userId}", new { }, connectionString);
        List<IUserCredidentalInfo> p2OptCredidentals = await db.GetData<IUserCredidentalInfo, dynamic>(
                        $"SELECT * FROM user_credidentals WHERE userId = {p2Opt.userId}", new { }, connectionString);

        int MATCH_ID = await SaveMatch(p1Token, p2Token, p1Color, db, connectionString);

        string[] message = { 
            FormatData(p1Color, MATCH_ID, p1OptProfile.userRank, p1OptCredidentals[0].userName), 
            FormatData(p2Color, MATCH_ID, p2OptProfile.userRank, p2OptCredidentals[0].userName) 
        };
        return new MatchSetupReturnInfo(message, MATCH_ID);
    }

    private async Task<int> SaveMatch(string p1Token, string p2Token, int p1Color, MySQL db, string connectionString)
    {
        string white = p1Token;
        string black = p2Token;
        if(p1Color == 1)
        {
            white = p2Token;
            black = p1Token;
        }
        string sqlInsert = $"INSERT INTO ongoing_matches (player1_token, player2_token, match_status, match_log) VALUES ('{white}', '{black}', '', '')";
        await db.SaveData(sqlInsert, new { }, connectionString);
        string sqlSelect = $"SELECT * FROM ongoing_matches WHERE player1_token = '{p1Token}'";
        List<OngoingMatchInfo> matchInfo = await db.GetData<OngoingMatchInfo, dynamic>(sqlSelect, new { }, connectionString);
        int matchId = matchInfo.ToArray()[0].match_Id;
        return matchId;
    }

    private string FormatData(int color, int matchId, int opponentRank, string opponentName)
    {
        string clr = "white";
        if(color == 1) { clr = "black"; }
        MatchSetupMessage message = new MatchSetupMessage("MATCH_FOUND", new MatchSetupMessageData(clr, matchId, opponentName, opponentRank));
        return Newtonsoft.Json.JsonConvert.SerializeObject(message); ;
    }
}
