import { createDefaultWebSocketConnection } from "../../api/websocket"



export let defaultWebSocket: WebSocket | null

export async function findQuickplayMatch(userId: number, userRank: number): Promise<Object>{
    return new Promise(async (resolve, reject) => {
        defaultWebSocket = await createDefaultWebSocketConnection()
        defaultWebSocket.onopen = (e: Event) => {
            defaultWebSocket?.send(JSON.stringify({
                protocol: "FIND_MATCH",
                data: {userId: userId, rank: userRank}
            }))
        }
        defaultWebSocket.onmessage = (e: Event) => {

        }
        defaultWebSocket.onclose = (e: Event) => {
            reject("websocket connection failed")
        }
        defaultWebSocket.onerror = (e: Event) => {
            console.log("ERROR: An error occured while trying to connecto a websocket at matchmaking.ts" , e)
            reject("websocket connection failed")
        }
    })
}