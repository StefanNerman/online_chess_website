import { createDefaultWebSocketConnection } from "../../api/websocket"

interface websocketServerMessage {
    protocol: string,
    data: object
}

export let pfpMessage = '0'

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
        defaultWebSocket.onmessage = (e: MessageEvent) => {
            console.log(e)
            let serverMessage: websocketServerMessage = JSON.parse(e.data)
            if(serverMessage.protocol = "MATCH_FOUND"){
                console.log('MATCH FOUND DATA ===>', serverMessage)
                resolve(serverMessage.data)
            }
            if(serverMessage.protocol === 'PROFILE_PIC'){
                console.log('OLD PROFILE PICTURE RECEIVED ===> ', serverMessage.data)
                let data = JSON.parse(e.data)
                pfpMessage = data.pic.toString()
            }
        }
        defaultWebSocket.onclose = (e: Event) => {
            reject("closed")
        }
        defaultWebSocket.onerror = (e: Event) => {
            console.log("ERROR: An error occured while trying to connecto a websocket at matchmaking.ts" , e)
            reject("failed")
        }
    })
}