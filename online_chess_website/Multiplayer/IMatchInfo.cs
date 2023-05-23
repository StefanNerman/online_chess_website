namespace online_chess_website.Multiplayer;
//move this to genericclasseslibrary into some folder for database table types
public interface IMatchInfo
{
    string player1_token { get; set; }
    string player2_token { get; set; }
    int match_Id { get; set; }
    string match_status { get; set; }
    string match_log { get; set; }
}
