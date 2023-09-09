import React, { useEffect, useState } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import PlayerInfoPanel from './PlayerInfoPanel'
import { useLocation } from 'react-router-dom'
import { defaultWebSocket } from '../main_menu/matchmaking'
import { artificialMove, playerColor, timeInterval } from './chess_game/ChessComponent'
import { whoseTurn } from './chess_game/gamelogic'
import {useNavigate} from 'react-router-dom'
import GameEndScreen from './GameEndScreen'
import * as api from '../../api/http_calls'
import { pfpMessage } from '../main_menu/matchmaking'

type props = {
    
} & React.ComponentProps<'div'>

let _matchId = 0

export function userMove(move: string){
    console.log('move ==>', move)
    console.log(whoseTurn, playerColor)
    if(whoseTurn === playerColor) return//to prevent form sending when your opponent moves
    let from = move.slice(7, 9)
    let to = move.slice(9, 11)
    if(move.length >= 12){
        from = move.slice(8, 10)
        to = move.slice(10, 12)
    }
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

export function sendPfp(pfp: string){
    defaultWebSocket?.send(JSON.stringify({
        protocol: "PROFILE_PIC",
        data: {
            pic: parseInt(pfp),
            matchId: _matchId,
            color: playerColor
        }
    }))
}

export function userCheckmate(move: string){
    if(whoseTurn === playerColor) return
    defaultWebSocket?.send(JSON.stringify({
        protocol: "CHECKMATE",
        data: {
            matchId: _matchId,
            color: playerColor
        }
    }))
}

export let setGameEnd: any
let gameEndScreenData = {
    duration: '00:00:00',
    oldRank: 1000,
    newRank: 1100,
    isVictory: true
}

export function showGameEndScreen(duration: string, oldRank: number, newRank: number, isVictory: boolean){
    gameEndScreenData.duration = duration
    gameEndScreenData.oldRank = oldRank
    gameEndScreenData.newRank = newRank
    gameEndScreenData.isVictory = isVictory
    setGameEnd(true)
}

let setOpponentPicture: any

const GamePage = ({...rest}: props) => {

    const navigate = useNavigate()

    const [gameEndScreen, setGameEndScreen] = useState(false)
    setGameEnd = setGameEndScreen

    const [opponentPfp, setOpponentPfp] = useState(pfpMessage === '0' ? '3' : pfpMessage)
    setOpponentPicture = setOpponentPfp

    useEffect(() => {
        if(isOnlineGame && defaultWebSocket){
            assignWebSocketMethods()
        }
        if(isOnlineGame && !defaultWebSocket) navigate('/main-menu')
    }) 

    useEffect(() => {
        setOpponentPfp(pfpMessage)
    }, [pfpMessage])

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
            {gameEndScreen && <GameEndScreen duration={gameEndScreenData.duration} oldRank={gameEndScreenData.oldRank} newRank={gameEndScreenData.newRank} isVictory={gameEndScreenData.isVictory}/>}
            <div className='gamepage-content'>
                <div className='playerinfo-container'>
                    {isOnlineGame && <PlayerInfoPanel username={sessionStorage.getItem('username')!} rank={parseInt(sessionStorage.getItem('userRank')!)} picture={sessionStorage.getItem('pfp')!}/>}
                    {isOnlineGame && <PlayerInfoPanel username={opponentName} rank={opponentRank} picture={opponentPfp}/>}
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
        console.log('NEW ONMESSAGE METHOD', e)
        let serverMessage = JSON.parse(e.data)
        if(serverMessage.protocol === 'OPPONENT_MOVED'){
            console.log(serverMessage.data)
            artificialMove(serverMessage.data.from, serverMessage.data.to)
        }
        if(serverMessage.protocol === 'PROFILE_PIC'){
            console.log('PROFILE PICTURE RECEIVED ===> ', serverMessage.data)
            setOpponentPicture(serverMessage.data.pic.toString())
        }
        if(serverMessage.protocol === 'MATCH_FOUND') {

        }
        if(serverMessage.protocol === 'MATCH_ENDED'){
            defaultWebSocket?.close()
            if(serverMessage.data.winner === "you" || serverMessage.data.winner === playerColor){

                onGameEnd(true)

            }
            else {

                onGameEnd(false)

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

async function onGameEnd(isVictory: boolean){
    const timer = document.getElementById('gamepanel-timetab')!
    let newRank = await api.axiosGet(`api/profiles/${sessionStorage.getItem('userId')}`)
    showGameEndScreen(timer.innerText, parseInt(sessionStorage.getItem('userRank')!), newRank.data.userRank, isVictory)
}
 
export default GamePage;