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
        WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
        Console.WriteLine("websocket connecting");
        await WSReceiveMessage(webSocket, async (result, buffer) => 
        { 
            if(result.MessageType == WebSocketMessageType.Text)
            {
                Console.WriteLine("text message received");
                return;
            }
            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("close message received");
                return;
            }
        });
    }
    else
    {
        await next();
    }
});

async Task WSReceiveMessage(WebSocket webSocket, Action<WebSocketReceiveResult, byte[]> handleMessage)
{
    var buffer = new byte[1024 * 4];
    while(webSocket.State == WebSocketState.Open)
    {
        var result = await webSocket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer), cancellationToken: CancellationToken.None);
        handleMessage(result, buffer);
    }
}


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
