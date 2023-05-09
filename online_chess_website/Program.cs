using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();

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

app.Use(async (context, next) =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        Console.WriteLine("websocket connecting");
        WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
    }
    else
    {
        if(next != null) { await next(context); }
    }
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
