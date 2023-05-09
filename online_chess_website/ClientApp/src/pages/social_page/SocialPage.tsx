import React, { useState } from 'react'

const SocialPage = () => {

    const [message, setMessage] = useState('')
    const [id, setId] = useState('')
    let webSocket: WebSocket

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
        webSocket.send('important message')
    }

    return (  
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
            <button onClick={onClick} style={{padding: '1rem'}}>connect</button>
            <input type='text' onChange={(e) => setMessage(e.target.value)} placeholder='message'></input>
            <input type='text' onChange={(e) => setId(e.target.value)} placeholder='id'></input>
            <button onClick={() => onSend()} style={{padding: '1rem'}}>send text</button>
            <div>

            </div>
        </div>
    );
}
 
export default SocialPage;