import React, { useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import PlayerInfoPanel from './PlayerInfoPanel'
import { useLocation } from 'react-router-dom'

type props = {
    
} & React.ComponentProps<'div'>

const GamePage = ({...rest}: props) => {

    const { state: {
        isOnlineGame,
        gameMode,// (quickplay | private | local | bot + [difficulty])
        color
    } = {} } = useLocation();



    return (
        <div className="gamepage" {...rest}>
            <div className='gamepage-content'>
                <div className='playerinfo-container'>
                    {isOnlineGame && <PlayerInfoPanel username={'anonwithlongddd'} rank={123} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>}
                    {isOnlineGame && <PlayerInfoPanel username={'anong'} rank={123} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>}
                </div>
                <div className='gamepage-gamepanel'>
                    <GamePanel gamemode={gameMode} color={color}/>
                </div>
            </div>
        </div>
    );
}
 
export default GamePage;