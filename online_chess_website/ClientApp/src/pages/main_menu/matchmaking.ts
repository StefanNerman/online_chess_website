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
            if(serverMessage.protocol == "MATCH_FOUND"){
                if('pic' in serverMessage.data){
                    pfpMessage = (serverMessage as any).data.pic.toString()
                }
                else {
                    resolve(serverMessage.data)
                }
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

export async function createPrivateGame(userId: number): Promise<Object>{
    return new Promise(async (resolve, reject) => {
        defaultWebSocket = await createDefaultWebSocketConnection()
        defaultWebSocket.onopen = (e: Event) => {
            defaultWebSocket?.send(JSON.stringify({
                protocol: "CREATE_PRIVATE_MATCH",
                data: {userId: userId}
            }))
        }
        defaultWebSocket.onmessage = (e: MessageEvent) => {
            console.log(e)
            let serverMessage: websocketServerMessage = JSON.parse(e.data)
            if(serverMessage.protocol == "SUCCESS"){
                console.log("your private game key is active")
            }
            if(serverMessage.protocol == "MATCH_FOUND"){
                console.log("your private game call has been answered")
                resolve(serverMessage.data)
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

export async function joinPrivateGame(userId: number, gameKey: string): Promise<Object>{
    console.log(gameKey)
    return new Promise(async (resolve, reject) => {
        if(gameKey === "nokey") reject("failed")
        defaultWebSocket = await createDefaultWebSocketConnection()
        defaultWebSocket.onopen = (e: Event) => {
            defaultWebSocket?.send(JSON.stringify({
                protocol: "JOIN_PRIVATE_MATCH",
                data: {userId: userId, gameKey: gameKey}
            }))
        }
        defaultWebSocket.onmessage = (e: MessageEvent) => {
            console.log(e)
            let serverMessage: websocketServerMessage = JSON.parse(e.data)
            if(serverMessage.protocol == "MATCH_FOUND"){
                console.log("youve successfully joined the game")
                resolve(serverMessage.data)
            }
            if(serverMessage.protocol == "FAILURE"){
                console.log("something went wrong when trying to connecto to the private game")
                defaultWebSocket?.close()
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