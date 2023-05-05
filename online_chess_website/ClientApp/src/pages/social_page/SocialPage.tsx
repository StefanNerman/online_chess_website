import React, { useState } from 'react'



const SocialPage = () => {

    const [message, setMessage] = useState('')
    const [id, setId] = useState('')
    let webSocket: WebSocket

    function onClick(){
        console.log(message, id)
        webSocket = new WebSocket("wss://localhost:44417", "stringhereok")
        webSocket.onopen = (event) => {
            webSocket.send("Here's some text that the server is urgently awaiting!");
        }
        
    }

    function onSend(){
        webSocket.send("helo from frontend")
    }

    return (  
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
            <button onClick={onClick} style={{padding: '1rem'}}>connect</button>
            <br></br>
            <input type='text' onChange={(e) => setMessage(e.target.value)} placeholder='message'></input>
            <input type='text' onChange={(e) => setId(e.target.value)} placeholder='id'></input>
            <button onClick={() => onSend()} style={{padding: '1rem'}}>send text</button>
            <div>

            </div>
        </div>
    );
}
 
export default SocialPage;