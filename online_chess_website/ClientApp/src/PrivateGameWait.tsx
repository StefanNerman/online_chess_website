import React from 'react'
import { privateGameActive } from './App';
import { defaultWebSocket } from './pages/main_menu/matchmaking';


const PrivateGameWait = () => {

    function handleClick(){
        privateGameActive(false)
        defaultWebSocket?.close()
    }

    let gamekey = sessionStorage.getItem('sessionToken')

    //maybe add button to automatically copy the gamekey to users clipboard

    return (  
        <div className='screenquemode-frame'>
            <div className='screenquemode-content'>
                <h2>Private lobby created</h2>
                <p>Your gamekey is: {gamekey}</p>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default PrivateGameWait;