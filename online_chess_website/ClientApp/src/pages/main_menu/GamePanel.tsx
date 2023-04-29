import React from 'react'
import GameSelectionComponent from './GameSelectionComponent'
import {useNavigate} from 'react-router-dom'
import {findQuickplayMatch} from './matchmaking'

interface props {
    offline: boolean
}




const GamePanel = (props: props) => {

    const navigate = useNavigate()
    
    function quickPlay(){
        let userId = sessionStorage.getItem('userId')!
        findQuickplayMatch(parseInt(userId), 1)
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
                        onButtonClick={() => {}}/>
                        <GameSelectionComponent 
                        description='Join private game using a link.' 
                        buttonText='Join private game'
                        onButtonClick={() => {}}/>
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
                        onButtonClick={() => {}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default GamePanel;