using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
   
}

app.UseWebSockets();

app.Use(async (context, next) =>
{
    Console.WriteLine(context);
    if (context.WebSockets.IsWebSocketRequest)
    {
        Console.WriteLine("WEBSOCKET");
    }
    else 
    { 
        Console.WriteLine("NOPE");
        await next();
    }
});

app.UseStaticFiles();
app.UseRouting();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
