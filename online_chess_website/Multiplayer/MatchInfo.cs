namespace online_chess_website.Multiplayer;
//move this to genericclasseslibrary into some folder for database table types
public class MatchInfo
{
    public int match_Id { get; set; }
    public string player1_token { get; set; }
    public string player2_token { get; set; }
    public string match_status { get; set; }
    public string match_log { get; set; }
}
