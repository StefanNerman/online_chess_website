using System.Net.WebSockets;

namespace online_chess_website.Middleware.Websocket;

public class WebsocketConnectionUserObject
{
    public WebSocket websocket { get; set; }
    public int ongoingMatchId = 0;

    public WebsocketConnectionUserObject(WebSocket websocket)
    {
        this.websocket = websocket;
    }
}
