import React, { useState, useEffect } from 'react';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing_page/LandingPage'
import MainMenu from './pages/main_menu/MainMenu'
import GamePage from './pages/game_page/GamePage'
import * as api from './api/http_calls'
import ProfilePage from './pages/profile_page/ProfilePage'


window.addEventListener('beforeunload', async () => {
    if(sessionStorage.getItem('loginOperation') === 'offline') return window.close()
    document.cookie = `ST=0;expires=Fri, 18 September 2099 11:00:00 UTC; path=/`
    await api.axiosPost('api/sessions/delete', 
    {
        userId: parseInt(sessionStorage.getItem('userId')!)
    })
    window.close()
}, true)

const App = () => {

    

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/main-menu" element={<MainMenu />} />
                <Route path="/game-page" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}

export default App
