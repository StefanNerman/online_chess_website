import React, { useState } from 'react';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing_page/LandingPage'
import MainMenu from './pages/main_menu/MainMenu'
import GamePage from './pages/game_page/GamePage'
import NavbarDefault from './NavbarDefault';

export let showNavbarController: Function

const App = () => {

    const [ showNavbar, setShowNavbar ] = useState(false)
    showNavbarController = setShowNavbar


    return (
        <div className="App">
            {showNavbar && <NavbarDefault />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/main-menu" element={<MainMenu />} />
                <Route path="/game-page" element={<GamePage />} />
            </Routes>
        </div>
    )
}

export default App
