using GenericClassesLibrary.DataAccess;
using online_chess_website.Data;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;

namespace online_chess_website.Multiplayer;

public class MatchSetup
{
    public async Task<MatchSetupReturnInfo> CreateMatch(string p1Token, string p2Token)
    {
        int p1Color = Random.Shared.Next(0, 1);
        int p2Color = 0;
        if(p1Color == 0) { p2Color = 1; }
        int MATCH_ID = await SaveMatch(p1Token, p2Token, p1Color);
        string[] message = { FormatData(p1Color, MATCH_ID), FormatData(p2Color, MATCH_ID) };
        return new MatchSetupReturnInfo(message, MATCH_ID);
    }

    private async Task<int> SaveMatch(string p1Token, string p2Token, int p1Color)
    {
        string white = p1Token;
        string black = p2Token;
        if(p1Color == 1)
        {
            white = p2Token;
            black = p1Token;
        }
        MySQL db = new MySQL();
        string connectionString = ConnectionStrings.defaultConnectionString;
        string sqlInsert = $"INSERT INTO ongoing_matches (player1_token, player2_token, match_status, match_log) VALUES ('{white}', '{black}', '', '')";
        await db.SaveData(sqlInsert, new { }, connectionString);
        string sqlSelect = $"SELECT * FROM ongoing_matches WHERE player1_token = '{p1Token}'";
        List<OngoingMatchInfo> matchInfo = await db.GetData<OngoingMatchInfo, dynamic>(sqlSelect, new { }, connectionString);
        int matchId = matchInfo.ToArray()[0].match_Id;
        return matchId;
    }

    private string FormatData(int color, int matchId)
    {
        string clr = "white";
        if(color == 1) { clr = "black"; }
        MatchSetupMessage message = new MatchSetupMessage("MATCH_FOUND", new MatchSetupMessageData(clr, matchId));
        return Newtonsoft.Json.JsonConvert.SerializeObject(message); ;
    }
}
