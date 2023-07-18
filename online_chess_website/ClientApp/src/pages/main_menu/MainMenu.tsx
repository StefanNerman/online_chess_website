import React, { useState, useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import Navbar from './FloatingNavbar'
import ExtraPanelRight from './ExtraPanelRight'
import ExtraPanelLeft from './ExtraPanelLeft'
import NavbarDefault from '../../components/NavbarDefault';
import * as api from '../../api/http_calls'
import SettingsComponent from './SettingsComponent'

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

export let settingsToggle: any
export let settingsToggleStatus: any

const MainMenu = () => {

    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 800 ? true : false)

    const [settingsOpen, setSettingsOpen] = useState(false)

    const [ statsRank, setStatsRank ] = useState(0)
    const [ statsTotal, setStatsTotal ] = useState(0)
    const [ statsWins, setStatsWins ] = useState(0)
    const [ statsLosses, setStatsLosses ] = useState(0)
    const [ statsDraws, setStatsDraws ] = useState(0)

    useEffect(() => {
        populateStatisticsPanel()
        settingsToggle = setSettingsOpen
        settingsToggleStatus = settingsOpen
        if(sessionStorage.getItem('profileExists') !== 'true') return createNewProfile()
    }, [settingsOpen])

    async function populateStatisticsPanel(){
        if(sessionStorage.getItem('loginOperation') === 'offline') return
        const userId = sessionStorage.getItem('userId')
        let profile: profileInfo = await api.axiosGet(`api/profiles/${userId}`)
        let gameStats: gameStats = await api.axiosGet(`api/user_game_data/${userId}`)
        console.log(profile, gameStats)
        setStatsRank(profile.data.userRank)
        setStatsTotal(gameStats.data.games_total)
        setStatsWins(gameStats.data.games_won)
        setStatsLosses(gameStats.data.games_lost)
        setStatsDraws(gameStats.data.draws)
    }

    //this runs if someone signs in
    function createNewProfile(){ 
        sessionStorage.setItem('profileExists', 'true')
    }

    window.addEventListener('resize', () => {
        let width = window.innerWidth
        if(width <= 800){
            setIsScreenWide(false)
        } 
        if(width > 800){
            setIsScreenWide(true)
        }
    })

    let loginOperation = sessionStorage.getItem('loginOperation')
    if(!loginOperation) loginOperation = 'offline'

    return (  
        <>
        {!isScreenWide && <NavbarDefault offline={loginOperation === 'offline' ? true : false}/>}
        <div className="mainmenu">
            <div className='mainmenu-container'>
                <Navbar offline={loginOperation === 'offline' ? true : false}/>
                <main>
                    {
                    settingsOpen ||
                    <>
                    {isScreenWide && <ExtraPanelLeft rank={statsRank} total={statsTotal} wins={statsWins} losses={statsLosses} draws={statsDraws}/>}
                    <GamePanel offline={loginOperation === 'offline' ? true : false}/>
                    <ExtraPanelRight />
                    </>
                    }
                    {
                    settingsOpen &&
                    <>
                    <SettingsComponent />
                    </>
                    }
                </main> 
            </div>
        </div>
        </>
    );
}
 
export default MainMenu;