import React, { useState } from 'react'



const SocialPage = () => {

    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    function onClick(){
        console.log(message, id)
    }

    return (  
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
            <input type='text' onChange={(e) => setMessage(e.target.value)} placeholder='message'></input>
            <input type='text' onChange={(e) => setId(e.target.value)} placeholder='id'></input>
            <button onClick={onClick} style={{padding: '1rem'}}>send text</button>
            <ul>

            </ul>
        </div>
    );
}
 
export default SocialPage;