import React, { useState } from 'react'

let webSocket: WebSocket

const SocialPage = () => {

    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    function onClick(){
        webSocket = new WebSocket("ws://localhost:5033/ws")
        webSocket.onopen = (e) => {
            console.log(e)
        }
        webSocket.onclose = (e) => {
            console.log(e)
        }
        webSocket.onerror = (e) => {
            console.log(e)
        }
        webSocket.onmessage = (e) => {
            console.log(e)
        }
    }

    function onSend(){
        let sendData = `{"message": "${message}", "id": "${id}"}`
        console.log(webSocket)
        webSocket.send(sendData)
    }

    function onClose(){
        if(!webSocket || webSocket.readyState !== WebSocket.OPEN){
            return console.log('connection is closed')
        }
        console.log(webSocket)
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