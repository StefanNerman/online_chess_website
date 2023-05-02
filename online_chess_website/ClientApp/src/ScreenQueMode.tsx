import React from 'react'
import { isQueingController } from './App';



const ScreenQueMode = () => {

    function handleClick(){
        isQueingController(false)
        //api call to cancel websocket and gamesearching
    }

    return (  
        <div className='screenquemode-frame'>
            <div className='screenquemode-content'>
                <h2>Searching for a game...</h2>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default ScreenQueMode;