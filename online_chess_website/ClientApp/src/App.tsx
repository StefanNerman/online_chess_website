import React, { useState, useEffect } from 'react';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as api from './api/http_calls'
import LandingPage from './pages/landing_page/LandingPage'
import MainMenu from './pages/main_menu/MainMenu'
import GamePage from './pages/game_page/GamePage'
import MenuComponent from './pages/main_menu/menu/MenuComponent'
import ScreenQueMode from './ScreenQueMode'
import ProfilePage from './pages/main_menu/profile/ProfilePage'
import NewsPage from './pages/main_menu/news/NewsPage'
import SocialPage from './pages/main_menu/social/SocialPage'
import SettingsPage from './pages/main_menu/settings/SettingsComponent'
import PrivateGameWait from './PrivateGameWait'



//This method could be replaced by turning "ST" into a session cookie or store it in sessionStorage 
//but you dont have to do it this method works just fine.
window.addEventListener('beforeunload', async () => {
    if(sessionStorage.getItem('loginOperation') === 'offline') return window.close()
    document.cookie = `ST=0;expires=Fri, 18 September 2099 11:00:00 UTC; path=/`


    //await api.axiosPost('api/sessions/delete', 
    //{
    //    userId: parseInt(sessionStorage.getItem('userId')!)
    //})
    

    window.close()
}, true)


export let isQueingController: Function

export let privateGameActive: Function

const App = () => {

    useEffect(() => {
        let sessionToken = sessionStorage.getItem('sessionToken')
        if(sessionToken) document.cookie = `ST=${sessionToken};expires=Fri, 18 September 2099 11:00:00 UTC; path=/`
    })

    const [isQueing, setIsQueing] = useState(false)
    isQueingController = setIsQueing

    const [isPrivateGameActive, setIsPrivateGameActive] = useState(false)
    privateGameActive = setIsPrivateGameActive

    return (
        <div className="App">
            {isQueing && <ScreenQueMode />}
            {isPrivateGameActive && <PrivateGameWait />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/main-menu" element={<MainMenu />}>
                    <Route path="menu" element={<MenuComponent />}/>
                    <Route path="profile" element={<ProfilePage />}/>
                    <Route path="news" element={<NewsPage />} />
                    <Route path="social" element={<SocialPage />} />
                    <Route path="settings" element={<SettingsPage />}/>
                </Route>
                <Route path="/game-page" element={<GamePage />} />
            </Routes>
        </div>
    )
}

export default App
