import React, { useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import PlayerInfoPanel from './PlayerInfoPanel'


const GamePage = () => {


    return (
        <div className="gamepage">
            <div className='gamepage-content'>
                <div className='playerinfo-container'>
                    <PlayerInfoPanel username={'anonwithlongddd'} rank={123} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>
                    <PlayerInfoPanel username={'anong'} rank={123} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>
                </div>
                <div className='gamepage-gamepanel'>
                    <GamePanel />
                </div>
            </div>
        </div>
    );
}
 
export default GamePage;