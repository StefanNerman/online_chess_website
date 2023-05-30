namespace GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;

public class OngoingMatchInfo
{
    public int match_Id { get; set; }
    public string player1_token { get; set; }
    public string player2_token { get; set; }
    public string match_status { get; set; }
    public string match_log { get; set; }
}
