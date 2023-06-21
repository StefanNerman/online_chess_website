import React, { useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import PlayerInfoPanel from './PlayerInfoPanel'
import { useLocation } from 'react-router-dom'
import { defaultWebSocket } from '../main_menu/matchmaking'
import { artificialMove, playerColor, timeInterval } from './chess_game/ChessComponent'
import { whoseTurn } from './chess_game/gamelogic'
import {useNavigate} from 'react-router-dom'

type props = {
    
} & React.ComponentProps<'div'>

let _matchId = 0

export function userMove(move: string){
    if(whoseTurn === playerColor) return//to prevent form sending when your opponent moves
    let from = move.slice(7, 9)
    let to = move.slice(9, 11)
    if(move.length >= 12){
        from = move.slice(8, 10)
        to = move.slice(10, 12)
    }
    console.log("checkpoint-------")
    defaultWebSocket?.send(JSON.stringify({
        protocol: "USER_MOVE",
        data: {
            from: parseInt(from),
            to: parseInt(to),
            matchId: _matchId,
            color: playerColor
        }
    }))
}

export function userCheckmate(move: string){
    if(whoseTurn === playerColor) return
    console.log("====>checkmate checkpoint")
    defaultWebSocket?.send(JSON.stringify({
        protocol: "CHECKMATE",
        data: {
            matchId: _matchId,
            color: playerColor
        }
    }))
}

const GamePage = ({...rest}: props) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(isOnlineGame && defaultWebSocket){
            assignWebSocketMethods()
        }
        if(isOnlineGame && !defaultWebSocket) navigate('/main-menu')
    })

    const { state: {
        isOnlineGame,
        gameMode,// (quickplay | private | local | bot + difficulty)
        color,
        matchId,
        opponentName,
        opponentRank
    } = {} } = useLocation();

    _matchId = matchId

    return (
        <div className="gamepage" {...rest}>
            <div className='gamepage-content'>
                <div className='playerinfo-container'>
                    {isOnlineGame && <PlayerInfoPanel username={sessionStorage.getItem('username')!} rank={parseInt(sessionStorage.getItem('userRank')!)} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>}
                    {isOnlineGame && <PlayerInfoPanel username={opponentName} rank={opponentRank} picture={'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>}
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
        console.log(e)
        let serverMessage = JSON.parse(e.data)
        if(serverMessage.protocol === 'OPPONENT_MOVED'){
            console.log(serverMessage.data)
            artificialMove(serverMessage.data.from, serverMessage.data.to)
        }
        if(serverMessage.protocol === 'MATCH_ENDED'){
            defaultWebSocket?.close()
            if(serverMessage.data.winner === "you" || serverMessage.data.winner === playerColor){

                //on victory events trigger

            }
            else {

                //on loss events trigger

            }
            console.log(serverMessage.data)
            console.log('match ended')
            window.clearInterval(timeInterval)
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