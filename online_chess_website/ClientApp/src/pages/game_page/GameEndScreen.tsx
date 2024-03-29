import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setGameEnd } from './GamePage'
import ButtonSmall from '../../components/btn_maintheme_small'

interface props {
    duration: string
    oldRank: number
    newRank: number
    isVictory: boolean
}

const GameEndScreen = ({duration, oldRank, newRank, isVictory}: props) => {

    const navigate = useNavigate()

    function exit(){
        setGameEnd(false)
        navigate('/main-menu/menu')
    }

    function hide(){
        setGameEnd(false)
    }

    return (  
        <div className="screenquemode-frame gameendscreen-frame">
            <div className='gameendscreen-content'>
                <div className='gameendscreen-top'>
                    <h1>{isVictory ? 'You won!' : 'You lost!'}</h1>
                    <p>{'Match lasted:        ' + duration}</p>
                    <p>{'Your old rank:       ' + oldRank}</p>
                    <p>{'Your new rank:       ' + newRank}</p>
                </div>
                <div className='gameendscreen-bottom'>
                    <ButtonSmall text={'Main menu'} onClick={() => exit()}/>
                    <ButtonSmall text={'Chessboard'} onClick={() => hide()}/>
                </div>
            </div>
        </div>
    )
}
 
export default GameEndScreen;