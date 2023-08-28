import React, { useEffect, useState } from 'react'
import ProfilePicture from './ProfilePicture'
import RoundEdgeButton from '../../../components/round_edge_button'
import { checkString } from '../../landing_page/LandingPage'
import StatsTop from './StatsTop'
import StatsBottom from './StatsBottom'
import * as api from '../../../api/http_calls'
import PfpSelectorBox from './PfpSelectorBox'


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
    const [changePasswordToggle, setChangePasswordToggle] = useState(false)

    const [changePfpPopupToggle, setChangePfpPopupToggle] = useState(false)

    const [ statsRank, setStatsRank ] = useState(0)
    const [ statsTotal, setStatsTotal ] = useState(0)
    const [ statsWins, setStatsWins ] = useState(0)
    const [ statsLosses, setStatsLosses ] = useState(0)
    const [ statsDraws, setStatsDraws ] = useState(0)

    let inputValue: string

    let newPassword: string 
    let confirmNewPassword: string

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
        await api.axiosGet(`api/login/${sessionStorage.getItem('userId') + ':' + name}`)
        .then(response => {
            console.log(response)
            sessionStorage.setItem('username', name)
            setChangeMade(false)
            alert('Username changed.')
        })
    }

    function toggleChangePassword() {
        if(changePasswordToggle) return setChangePasswordToggle(false)
        setChangePasswordToggle(true)
    }

    function passwordInputAction(e: any, inputIndex: number){
        let input = e.target.value
        if(inputIndex === 0){
            return newPassword = input
        }
        confirmNewPassword = input
    }

    function confirmPasswordChange(){
        if(!newPassword || !confirmNewPassword) return
        if(newPassword !== confirmNewPassword){
            return alert('Provided passwords do not match!')
        }
        let stringCheck = checkString(newPassword, true)
        if(stringCheck){
            return alert(stringCheck)
        }
        changePassword(newPassword)
    }

    function changePassword(password: string){
        api.axiosGet(`api/change_password/${sessionStorage.getItem('userId') + ':' + password}`)
        .then((response) => {
            console.log(response)
            if(response.data === 0) alert(`You can't set your current password as your old one!`)
            if(response.data === 1) alert(`An error has occured while changing your password. Password not changed.`)
            if(response.data === 2) alert(`Password changed succesfully!`)
            setChangePasswordToggle(false)
        })
    }

    function changePfp(){

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
                    <div className='profile-change-name-box profile-setting-textbox'>
                        {invalidName && <div></div>}
                        <label>Change name</label>
                        <input type='text' placeholder={sessionStorage.getItem('username')!} onChange={(e) => {nameInputAction(e)}}></input>
                    </div>

                    {
                    changePasswordToggle ||
                    <div className='profile-change-password-box'>
                        <label>Change password</label>
                        <button className='profile-settings-button profile-settings-button-brown' onClick={() => {toggleChangePassword()}}>Change</button>
                    </div>

                    }

                    {
                    changePasswordToggle &&
                    <div id='change-password-box' className='profile-setting-textbox'>
                        <label>New password</label>
                        <input type='password' onChange={(e) => {passwordInputAction(e, 0)}}></input>
                        <label>Confirm new password</label>
                        <input type='password' onChange={(e) => {passwordInputAction(e, 1)}}></input>
                        <div>
                            <button className='profile-settings-button profile-settings-button-brown' onClick={() => {confirmPasswordChange()}}>Confirm</button>
                            <button className='profile-settings-button profile-settings-button-brown' onClick={() => {toggleChangePassword()}}>Cancel</button>
                        </div>
                    </div>
                    }

                    {

                    changePfpPopupToggle ||

                    <div className='profile-change-pfp-box'>
                        <label>Change profile picture</label>
                        <button className='profile-settings-button profile-settings-button-brown' onClick={() => {setChangePfpPopupToggle(true)}}>Select</button>
                    </div>
                    }

                    {
                        
                    changePfpPopupToggle &&

                    <div className='change-pfp-popup'>
                        <label>Select new picture</label>
                        <div className='top'>
                            <div className='back-selector'></div>
                            <PfpSelectorBox image={''} onClick={() => {}} id='pfp-selection-image-1' />
                            <PfpSelectorBox image={''} onClick={() => {}} id='pfp-selection-image-2' />
                            <PfpSelectorBox image={''} onClick={() => {}} id='pfp-selection-image-3' />
                            <div className='front-selector'></div>
                        </div>
                        <div className='bottom'>
                            <button className='profile-settings-button profile-settings-button-brown' onClick={() => {}}>Confirm</button>
                            <button className='profile-settings-button profile-settings-button-brown' onClick={() => {setChangePfpPopupToggle(false)}}>Cancel</button>
                        </div>
                    </div>
                    }



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