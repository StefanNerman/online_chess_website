import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setGameEnd } from './GamePage'

interface props {
    duration: string
    oldRank: number
    newRank: number
    isVictory: boolean
}

const GameEndScreen = ({duration, oldRank, newRank, isVictory}: props) => {

    const navigate = useNavigate()

    function close(){
        setGameEnd(false)
        navigate('/main-menu')
    }

    return (  
        <div className="screenquemode-frame">
            <button onClick={close}>close</button>
        </div>
    )
}
 
export default GameEndScreen;