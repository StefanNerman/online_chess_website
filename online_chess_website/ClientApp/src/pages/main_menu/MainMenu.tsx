import React, { useState, useEffect } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import Navbar from './FloatingNavbar'
import ExtraPanelRight from './ExtraPanelRight'
import ExtraPanelLeft from './ExtraPanelLeft'
import NavbarDefault from '../../NavbarDefault';


const MainMenu = () => {

    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 800 ? true : false)

    useEffect(() => {
        if(sessionStorage.getItem('profileExists') !== 'true') return createNewProfile()
    }, [])

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
                    {isScreenWide && <ExtraPanelLeft />}
                    <GamePanel offline={loginOperation === 'offline' ? true : false}/>
                    <ExtraPanelRight />
                </main> 
            </div>
        </div>
        </>
    );
}
 
export default MainMenu;