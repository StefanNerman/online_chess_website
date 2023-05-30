using GenericClassesLibrary.DataAccess;
using GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;
using online_chess_website.Data;

namespace online_chess_website.Multiplayer;

public class MatchDataManager
{
    public async Task<string> GetOpponentToken(int matchId, string playerColor)
    {
        MySQL db = new MySQL();
        string connString = ConnectionStrings.defaultConnectionString;
        string sql = $"SELECT * FROM ongoing_matches WHERE match_Id = {matchId}";
        List<OngoingMatchInfo> rows = await db.GetData<OngoingMatchInfo, dynamic>(sql, new { }, connString);
        string outToken = "";
        if(playerColor == "white") { outToken = rows[0].player2_token; }
        if(playerColor == "black") { outToken = rows[0].player1_token; }
        return outToken;
    }
}
