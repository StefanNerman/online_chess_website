import React, { useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import PlayerInfoPanel from './PlayerInfoPanel'
import { useLocation } from 'react-router-dom'
import { defaultWebSocket } from '../main_menu/matchmaking'
import { artificialMove } from './chess_game/ChessComponent'

type props = {
    
} & React.ComponentProps<'div'>

export function userMove(move: string){
    defaultWebSocket?.send(JSON.stringify({
        protocol: "USER_MOVE",
        data: {
            from: parseInt(move.slice(7, 9)),
            to: parseInt(move.slice(10, 12))
        }
    }))
}

const GamePage = ({...rest}: props) => {

    const { state: {
        isOnlineGame,
        gameMode,// (quickplay | private | local | bot + [difficulty])
        color,
        matchId
    } = {} } = useLocation();

    if(isOnlineGame){
        assignWebSocketMethods()
    }

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

function assignWebSocketMethods(){
    defaultWebSocket!.onopen = ()=>{}
    defaultWebSocket!.onmessage = (e: MessageEvent) => {
        let serverMessage = JSON.parse(e.data)
        if(serverMessage.protocol === 'OPPONENT_MOVED'){
            artificialMove(serverMessage.data.from, serverMessage.data.to)
        }
        if(serverMessage.protocol === 'CHAT_MESSAGE'){

        }
    }
    defaultWebSocket!.onclose = (e: Event) => {
        console.log(e)
    }
    defaultWebSocket!.onerror = (e: Event) => {
        console.log(e)
    }
}
 
export default GamePage;