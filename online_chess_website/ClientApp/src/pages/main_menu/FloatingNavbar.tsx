import React, {useEffect, useState} from 'react'
import ProfileBox from '../../components/profile_info'
import LogoBig from '../../components/logo_big'
import * as api from '../../api/http_calls'
import NavbarButton from '../../components/navbar_button'

interface props {
    offline: boolean
}

const FloatingNavbar = (params: props) => {

    interface profile {
        username: string
        userRank: number
        picture: string
    }

    const [profile, setProfile] = useState({
        username: '',
        userRank: 0,
        picture: ''
    })

    useEffect(() => {
        api.axiosGet(`api/profiles/${parseInt(sessionStorage.getItem('userId')!)}`)
        .then((response) => {
            console.log(response.data)
            setProfile(response.data)
        })
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
                        <NavbarButton text={'settings'} click={() => {}}/>
                        <NavbarButton text={'news'} click={() => {}}/>
                        <NavbarButton text={'social'} click={() => {}}/>
                        <NavbarButton text={'my profile'} click={() => {}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default FloatingNavbar;