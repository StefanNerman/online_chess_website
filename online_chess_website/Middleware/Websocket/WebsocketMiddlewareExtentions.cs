using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace online_chess_website.Middleware.Websocket;

public static class WebsocketMiddlewareExtentions
{
    public static IApplicationBuilder UseWebsocketServer(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<WebsocketConnection>();
    }
    public static IServiceCollection AddWebsocketManager(this IServiceCollection services)
    {
        services.AddSingleton<WebsocketConnectionManager>();
        return services;
    }
}
