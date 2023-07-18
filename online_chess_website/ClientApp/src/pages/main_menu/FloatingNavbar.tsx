import React, {useEffect, useState} from 'react'
import ProfileBox from '../../components/profile_info'
import LogoBig from '../../components/logo_big'
import NavbarButton from '../../components/navbar_button'
import SignoutButton from '../../components/signout_button'
import {useNavigate} from 'react-router-dom'
import {getProfileByUserId} from '../../utils/user_profile_info'
import {settingsToggle, settingsToggleStatus} from './MainMenu'

interface props {
    offline: boolean
}

const FloatingNavbar = (params: props) => {

    

    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        username: '',
        userRank: 0,
        picture: ''
    })

    useEffect(() => {
        sessionStorage.getItem('loginOperation') === 'offline' || getProfileByUserId(parseInt(sessionStorage.getItem('userId')!))
        .then((response) => {
            setProfile(response)
        })
        .catch(() => alert('could not find profile data'))
    }, [])


    
    return (  
        <div className='floating-navbar-frame'>
            <div className='floating-navbar-screen'>
                <div className='logo-embed'>
                    <LogoBig />
                </div>
                <div className='floating-navbar-profilebox'>
                    {params.offline && 'offline'}
                    {params.offline || <ProfileBox info={profile.userRank ? profile.userRank.toString() : '0'} username = {sessionStorage.getItem('username') || 'null'} 
                    image={profile.picture ? profile.picture : 'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg'}/>}
                </div>
                {/*SETTINGS NEWS SOCIAL MY_PROFILE*/}
                <div className='floating-navbar-buttons-frame'>
                    <div className='floating-navbar-buttons-container'>
                        <NavbarButton text={'My profile'} onClick={() => {
                                                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be signed in to view your profile!')
                                                                    navigate('/profile')
                                                                    }}/>
                        <NavbarButton text={'News'} onClick={() => {navigate('/news')}}/>
                        <NavbarButton text={'Social'} onClick={() => {
                                                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be singed in to view your socials!')
                                                                    navigate('/social')
                                                                    }}/>
                        <NavbarButton text={'Settings'} onClick={() => {
                                                                    if(settingsToggleStatus){
                                                                        return settingsToggle(false)
                                                                    }
                                                                    settingsToggle(true)
                                                                }}/>
                    </div>
                </div>
                <div className='floating-navbar-signout-box'>
                    <SignoutButton />
                </div>
            </div>
        </div>
    );
}
 
export default FloatingNavbar;