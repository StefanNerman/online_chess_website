using online_chess_website.Middleware.GameFinder;
using online_chess_website.Middleware.Websocket;
using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<QuemodeManager>();
builder.Services.AddTransient<QuemodeActions>((context) =>
{
    QuemodeManager manager = context.GetService<QuemodeManager>();
    return new QuemodeActions(manager);
});
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


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
