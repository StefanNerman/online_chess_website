import React, {useEffect, useState} from 'react'
import ProfileBox from '../../components/profile_info'
import LogoBig from '../../components/logo_big'
import NavbarButton from '../../components/navbar_button'
import SignoutButton from '../../components/signout_button'
import {useNavigate} from 'react-router-dom'
import {getProfileByUserId} from '../../utils/user_profile_info'

interface props {
    offline: boolean
}

const FloatingNavbar = (params: props) => {

    

    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        userId: 0,
        userRank: 0,
        profilePicture: ''
    })

    useEffect(() => {
        sessionStorage.getItem('loginOperation') === 'offline' || getProfileByUserId(parseInt(sessionStorage.getItem('userId')!))
        .then((response) => {
            setProfile(response)
            sessionStorage.setItem('pfp', response.profilePicture)
            console.log(response)
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
                    image={'profile-image-40px-' + profile.profilePicture}/>}
                </div>
                {/*SETTINGS NEWS SOCIAL MY_PROFILE*/}
                <div className='floating-navbar-buttons-frame'>
                    <div className='floating-navbar-buttons-container'>
                        <NavbarButton text={'Main menu'} onClick={() => {navigate('menu')}}/>
                        <NavbarButton text={'My profile'} onClick={() => {
                                                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be signed in to view your profile!')
                                                                    navigate('profile')
                                                                    }}/>
                        <NavbarButton text={'News'} onClick={() => {navigate('news')}}/>
                        <NavbarButton text={'Social'} onClick={() => {
                                                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be singed in to view your socials!')
                                                                    navigate('social')
                                                                    }}/>
                        <NavbarButton text={'Settings'} onClick={() => {navigate('settings')}}/>
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