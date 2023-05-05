import React from 'react'
import GameSelectionComponent from './GameSelectionComponent'
import {useNavigate} from 'react-router-dom'
import {findQuickplayMatch} from './matchmaking'
import * as api from '../../api/http_calls'
import {getProfileByUserId} from '../../utils/user_profile_info'
import {isQueingController} from '../../App'

interface props {
    offline: boolean
}

interface profile {
    userRank: number
    userId: number
    profilePicture: string
}

const GamePanel = (props: props) => {

    const navigate = useNavigate()
    
    async function quickPlay(){
        isQueingController(true)
        let userId = sessionStorage.getItem('userId')!
        let profile = await getProfileByUserId(parseInt(userId))
        findQuickplayMatch(parseInt(userId), profile.userRank)
        .then(response => {
            openQuickplayGame(response)
        })
    }
    function openQuickplayGame(matchInfo: any){
        return
        navigate('/game-page', { state: { 
            isOnlineGame: true,
            gameMode: 'quickplay',
            color: 'white'
        }})
    }

    function privateGame(){

    }

    function joinPrivateGame(){
        
    }

    function localGame(){
        navigate('/game-page', { state: { 
            isOnlineGame: false,
            gameMode: 'local',
            color: 'white'
        }})
    }

    function botGame(){
            api.axiosPost('api/rating/update', {userId: 28, rank: 2854, opponentRank: 2777, gameResult: 0})
            
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
                        onButtonClick={() => {joinPrivateGame()}}/>
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