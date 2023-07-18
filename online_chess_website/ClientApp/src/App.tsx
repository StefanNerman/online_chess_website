import React, { useState, useEffect } from 'react';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing_page/LandingPage'
import MainMenu from './pages/main_menu/MainMenu'
import GamePage from './pages/game_page/GamePage'
import * as api from './api/http_calls'
import ProfilePage from './pages/profile_page/ProfilePage'
import NewsPage from './pages/news_page/NewsPage'
import SocialPage from './pages/social_page/SocialPage'
import ScreenQueMode from './ScreenQueMode'


window.addEventListener('beforeunload', async () => {
    if(sessionStorage.getItem('loginOperation') === 'offline') return window.close()
    document.cookie = `ST=0;expires=Fri, 18 September 2099 11:00:00 UTC; path=/`

    /*
    MAKE IT SO THAT SESSION GETS DELETED IF YOU SIGN OUT MANUALLY

    await api.axiosPost('api/sessions/delete', 
    {
        userId: parseInt(sessionStorage.getItem('userId')!)
    })
    */

    window.close()
}, true)

export let isQueingController: Function

const App = () => {

    useEffect(() => {
        let sessionToken = sessionStorage.getItem('sessionToken')
        if(sessionToken) document.cookie = `ST=${sessionToken};expires=Fri, 18 September 2099 11:00:00 UTC; path=/`
    })

    const [isQueing, setIsQueing] = useState(false)
    isQueingController = setIsQueing

    return (
        <div className="App">
            {isQueing && <ScreenQueMode />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/main-menu" element={<MainMenu />} />
                <Route path="/game-page" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/social" element={<SocialPage />} />
            </Routes>
        </div>
    )
}

export default App
