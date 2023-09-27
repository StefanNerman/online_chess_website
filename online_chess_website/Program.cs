using online_chess_website.Middleware.GameFinder;
using online_chess_website.Middleware.Websocket;
using online_chess_website.Multiplayer;
using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<QuemodeManager>();
builder.Services.AddTransient<QuemodeActions>((context) =>
{
    QuemodeManager manager = context.GetService<QuemodeManager>();
    return new QuemodeActions(manager);
});
builder.Services.AddSingleton<PrivateQueManager>(); 
builder.Services.AddTransient<PrivateQueActions>((context) => { 
    PrivateQueManager manager = context.GetService<PrivateQueManager>();
    return new PrivateQueActions(manager);
});
builder.Services.AddSingleton<OngoingMatches>();
builder.Services.AddWebsocketManager();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{

}

app.UseStaticFiles();
app.UseRouting();

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

app.UseWebSockets(webSocketOptions);

app.UseWebsocketServer();

MatchFinder matchFinder = new MatchFinder(app.Services.GetService<QuemodeManager>(),
                                          app.Services.GetService<WebsocketConnectionManager>(),
                                          app.Services.GetService<OngoingMatches>());
matchFinder.LaunchProcess();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
