import React from 'react'
import { privateGameActive } from './App';
import { defaultWebSocket } from './pages/main_menu/matchmaking';


const PrivateGameWait = () => {

    function handleClick(){
        privateGameActive(false)
        defaultWebSocket?.close()
    }

    let gamekey = sessionStorage.getItem('sessionToken')

    //make it so your gamekey (sessiontoken) is visible on this screen

    return (  
        <div className='screenquemode-frame'>
            <div className='screenquemode-content'>
                <h2>Your gamekey is: {gamekey}</h2>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default PrivateGameWait;