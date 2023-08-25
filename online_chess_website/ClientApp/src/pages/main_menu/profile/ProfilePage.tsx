import React, { useEffect, useState } from 'react'
import ProfilePicture from './ProfilePicture'
import RoundEdgeButton from '../../../components/round_edge_button'
import { checkString } from '../../landing_page/LandingPage'
import StatsTop from './StatsTop'
import StatsBottom from './StatsBottom'
import * as api from '../../../api/http_calls'


interface profileInfo {
    data: {
        username: string
        userRank: number
        picture: string
    }
}

interface gameStats {
    data: {
        id: number
        games_total: number
        games_won: number
        games_lost: number
        draws: number
    }
}

const ProfilePage = () => {

    const [changeMade, setChangeMade] = useState(false)
    const [invalidName, setInvalidName] = useState(false)

    const [ statsRank, setStatsRank ] = useState(0)
    const [ statsTotal, setStatsTotal ] = useState(0)
    const [ statsWins, setStatsWins ] = useState(0)
    const [ statsLosses, setStatsLosses ] = useState(0)
    const [ statsDraws, setStatsDraws ] = useState(0)

    let inputValue: string

    useEffect(() => {
        populateStatisticsPanel()
    }, [])

    function nameInputAction(e: any){
        let input: string = e.target.value
        if(input === '' || input === sessionStorage.getItem('username')) {
            setInvalidName(false)
            return setChangeMade(false)
        }
        let stringCheck = checkString(input, false)
        if(stringCheck){
            setInvalidName(true)
            return setChangeMade(false)
        }
        setInvalidName(false)
        setChangeMade(true)
        inputValue = input
    }

    async function populateStatisticsPanel(){
        if(sessionStorage.getItem('loginOperation') === 'offline') return
        const userId = sessionStorage.getItem('userId')
        let profile: profileInfo = await api.axiosGet(`api/profiles/${userId}`)
        let gameStats: gameStats = await api.axiosGet(`api/user_game_data/${userId}`)
        setStatsRank(profile.data.userRank)
        setStatsTotal(gameStats.data.games_total)
        setStatsWins(gameStats.data.games_won)
        setStatsLosses(gameStats.data.games_lost)
        setStatsDraws(gameStats.data.draws)
    }

    async function saveChanges(){
        //check if user only changed once parameter to avoid unnecessary api calls

        await api.axiosGet(`api/signup/${inputValue ? inputValue : ''}`)
        .then(response => {
            if(!response.data){         
                return alert('Username taken!')
            }
            changeName(inputValue)
        })
        .catch(response => {console.log('ERROR: ', response)})

        //check the pfp here
    }

    async function changeName(name: string){
        
    }


    return (  
        <div id='profile-frame'>
            <div className='profile-top-frame'>
                <ProfilePicture image='image1' id='profile-page-pfp'/>
                <div className='profile-top-name-container'>
                    {sessionStorage.getItem('username')}
                </div>
            </div>
            <div className='profile-bottom-frame'>
                
                <div className='profile-bottom-stats'>
                    <h4>Player statistics</h4>
                    <StatsTop rank={statsRank}/>
                    <StatsBottom games={statsTotal} wins={statsWins} losses={statsLosses} draws={statsDraws}/>
                </div>

                <div className='dotted-line'></div>

                <div className='profile-bottom-settings'>
                    <h4>Profile settings</h4>
                    <div className='profile-change-name-box'>
                        {invalidName && <div></div>}
                        <label>Change name</label>
                        <input type='text' placeholder={sessionStorage.getItem('username')!} onChange={(e) => {nameInputAction(e)}}></input>
                    </div>
                    <div className='profile-change-pfp-box'>
                        <label>Change profile picture</label>
                        <button className='profile-settings-button'>Select</button>
                    </div>
                    <div className='profile-delete-box'>
                        <label>Delete profile</label>
                        <button className='profile-settings-button'>Delete</button>
                    </div>
                </div>

                {
                changeMade &&
                <div id='page-exit-options-container'>
                    <RoundEdgeButton text='Save' onClick={() => {saveChanges()}}/>
                    <RoundEdgeButton text='Cancel' onClick={() => {/*navigate to menu or reload profile page*/}}/>
                </div>
                }
            </div>
        </div>
    );
}
 
export default ProfilePage;