import React, { useEffect } from 'react'
import GameSelectionComponent from './GameSelectionComponent'
import {useNavigate} from 'react-router-dom'
import {findQuickplayMatch, defaultWebSocket, createPrivateGame, joinPrivateGame} from '../matchmaking'
import * as api from '../../../api/http_calls'
import {getProfileByUserId} from '../../../utils/user_profile_info'
import {isQueingController} from '../../../App'
import { timeInterval } from '../../game_page/chess_game/ChessComponent'
import { resetBoard } from '../../game_page/chess_game/gamelogic'

interface props {
    offline: boolean
}

interface profile {
    userRank: number
    userId: number
    profilePicture: string
}

interface serverMessageData {
    color: string
    MATCH_ID: number
    opponentName: string
    opponentRank: number
}

interface profileInfo {
    data: profile
}

const GamePanel = (props: props) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(defaultWebSocket) defaultWebSocket.close()
        if(timeInterval) window.clearInterval(timeInterval)
    }, [])
    
    async function quickPlay(){
        if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You have to be signed in to use quickplay!')
        isQueingController(true)
        let userId = sessionStorage.getItem('userId')!
        let profile = await getProfileByUserId(parseInt(userId))
        findQuickplayMatch(parseInt(userId), profile.userRank)
        .then(response => {
            openQuickplayGame((response as any), false)
        })
        .catch(result => console.log("Websocket connection: " + result))
    }

    async function openQuickplayGame(matchInfo: serverMessageData, isPrivateGame: boolean){
        isQueingController(false)
        sessionStorage.setItem('matchId', matchInfo.MATCH_ID.toString())
        let userId = sessionStorage.getItem('userId')
        let profile: profileInfo = await api.axiosGet(`api/profiles/${userId}`)
        sessionStorage.setItem('userRank', profile.data.userRank.toString())
        resetBoard()
        navigate('/game-page', { state: { 
            isOnlineGame: true,
            isPrivateGame: isPrivateGame,
            gameMode: 'quickplay',
            color: matchInfo.color,
            matchId: matchInfo.MATCH_ID,
            opponentName: matchInfo.opponentName,
            opponentRank: matchInfo.opponentRank,
        }})
    }

    //add code to prevent from trying to enter quickplay or joining private game when a created private game is in action

    function privateGame(){
        if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You have to be signed in to create private games!')
        let userId = sessionStorage.getItem('userId')!
        createPrivateGame(parseInt(userId))
        .then(response => {
            console.log(response)
            openQuickplayGame((response as any), true)
        })
        .catch((e) => console.log("ERROR: " + e))
    }

    function enterPrivateGame(){
        if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You have to be signed in to join private games!')
        let userId = sessionStorage.getItem('userId')!
        joinPrivateGame(parseInt(userId), prompt("Input game key", "") || "nokey")
        .then(response => {
            console.log(response)
            openQuickplayGame((response as any), true)
        })
        .catch((e) => console.log("ERROR: " + e))
    }

    function localGame(){
        resetBoard()
        navigate('/game-page', { state: { 
            isOnlineGame: false,
            gameMode: 'local',
            color: 'white',
            matchId: 0,
            opponentName: "",
            opponentRank: 0
        }})
    }

    function botGame(){
        alert('This feature is not yet functional.')
    }

    return (  
        <div className='gamesearchpanel-frame'>
            <div className='gamesearchpanel-screen'>
                <h3>Find a game</h3>
                <div className='gamesearchpanel-content'>
                    <div className='gamesearchpanel-button-container'>
                        <h5>Play online</h5>
                        <GameSelectionComponent 
                        description='Find a match online against a random opponent of similar skill level.' 
                        buttonText='Quickplay'
                        onButtonClick={() => {quickPlay()}}/>
                        <GameSelectionComponent 
                        description='Create a private game that your friend can join via link.' 
                        buttonText='Create private game'
                        onButtonClick={() => {privateGame()}}/>
                        <GameSelectionComponent 
                        description='Join private game using a link.' 
                        buttonText='Join private game'
                        onButtonClick={() => {enterPrivateGame()}}/>
                    </div>
                    <div className='gamesearchpanel-button-container'>
                        <h5>Play offline</h5>
                        <GameSelectionComponent 
                        description='Here you can play alone or against a friend offline.' 
                        buttonText='Local game'
                        onButtonClick={() => {localGame()}}/>
                        <GameSelectionComponent 
                        description='Select a diffuculty and test your skills against a chess-bot.' 
                        buttonText='Play against bots' 
                        onButtonClick={() => {botGame()}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default GamePanel;