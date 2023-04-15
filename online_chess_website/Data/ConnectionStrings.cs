namespace online_chess_website.Data;

public static class ConnectionStrings
{
    public static readonly string defaultConnectionString = "server=localhost;uid=root;pwd=password;database=chess_website_data";
    public static string GetString(string stringName)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true, true);
        IConfigurationRoot configRoot = builder.Build();
        return configRoot.GetConnectionString(stringName);
    }
}
