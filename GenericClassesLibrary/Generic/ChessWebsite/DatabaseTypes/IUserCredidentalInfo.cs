namespace GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes
{
    public interface IUserCredidentalInfo
    {
        int userId { get; set; }
        string userName { get; set; }
        string userPassword { get; set; }
    }
}