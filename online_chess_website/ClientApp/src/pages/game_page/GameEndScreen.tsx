import React from 'react'
import { setGameEnd } from './GamePage'

interface props {
    duration: string
    oldRank: number
    newRank: number
    isVictory: boolean
}

const GameEndScreen = ({duration, oldRank, newRank, isVictory}: props) => {

    console.log('GAMEENDSCREEN ON')

    function click(){
        setGameEnd(false)
    }

    return (  
        <div className="screenquemode-frame">
            <button onClick={click}>close</button>
        </div>
    )
}
 
export default GameEndScreen;