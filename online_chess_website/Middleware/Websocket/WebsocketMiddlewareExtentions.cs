using Microsoft.AspNetCore.Builder;

namespace online_chess_website.Middleware.Websocket;

public static class WebsocketMiddlewareExtentions
{
    public static IApplicationBuilder UseWebsocketServer(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<WebsocketConnection>();
    }
}
