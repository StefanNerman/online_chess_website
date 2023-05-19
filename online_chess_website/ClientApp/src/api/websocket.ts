export function createDefaultWebSocketConnection(): Promise<WebSocket>{
    return new Promise((resolve, reject) => {
        const webSocket = new WebSocket("ws://localhost:5033/ws")
        resolve(webSocket)
    })
}