import React, { useState } from 'react'

let webSocket: WebSocket

const SocialPage = () => {

    //Delete all the websocket stuff later but leave it for now as a practical example of working websocket

    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    function onClick(){
        webSocket = new WebSocket("ws://localhost:5033/ws")
        webSocket.onopen = (e) => {
            console.log("WEBSOCKET OPENED: ", e)
        }
        webSocket.onclose = (e) => {
            console.log("WEBSOCKET CLOSING: ", e)
        }
        webSocket.onerror = (e) => {
            console.log("WEBSOCKET ERROR: ", e)
            handleError(e)
        }
        webSocket.onmessage = (e) => {
            console.log("WEBSOCKET MESSAGE: ", e)
            handleMessage(e)
        }
    }
    function handleMessage(e: any){

    }

    function handleError(e:any){}
    function onSend(){
        let send = JSON.stringify({protocol:"SEND_INFO",data:{message:message,id:id}})
        console.log("MESSAGE SENT: ", send)
        webSocket.send(send)
    }

    function onClose(){
        if(!webSocket || webSocket.readyState !== WebSocket.OPEN){
            return console.log('connection is closed')
        }
        console.log("CLIENT CLOSED CONNECTION")
        webSocket.close(1000, 'Client terminated connection')
    }

    return (  
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
            <button onClick={onClick} style={{padding: '1rem'}}>connect</button>
            <input type='text' onChange={(e) => setMessage(e.target.value)} placeholder='message'></input>
            <input type='text' onChange={(e) => setId(e.target.value)} placeholder='id'></input>
            <button onClick={() => onSend()} style={{padding: '1rem'}}>send text</button>
            <div>

            </div>
            <button onClick={() => onClose()} style={{padding: '1rem', marginLeft: '1rem'}}>close connection</button>
        </div>
    );
}
 
export default SocialPage;