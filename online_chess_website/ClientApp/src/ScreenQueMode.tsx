import React from 'react'
import { isQueingController } from './App';
import { defaultWebSocket } from './pages/main_menu/matchmaking';


const ScreenQueMode = () => {

    function handleClick(){
        isQueingController(false)
        defaultWebSocket?.close()
    }

    return (  
        <div className='screenquemode-frame'>
            <div className='screenquemode-content max-height-170'>
                <h2>Searching for a game...</h2>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default ScreenQueMode;