import React, { useState } from 'react'
import './style.css'
import { operation } from '../landing_page/LandingPage'
import GamePanel from './GamePanel'
import Navbar from './Navbar'
import ExtraPanelRight from './ExtraPanelRight'
import ExtraPanelLeft from './ExtraPanelLeft'
import { showNavbarController } from '../../App'


const MainMenu = () => {
    
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 800 ? true : false)


    window.addEventListener('resize', () => {
        let width = window.innerWidth
        if(width <= 800){
            setIsScreenWide(false)
            showNavbarController(true)
            //change navbar and all that stuff
        } 
        if(width > 800){
            setIsScreenWide(true)
            showNavbarController(false)
        }
    })



    return (  
        <div className="mainmenu">
            <div className='mainmenu-container'>
                <Navbar offline={operation === 'offline' ? true : false}/>
                <main>
                    {isScreenWide && <ExtraPanelLeft />}
                    <GamePanel offline={operation === 'offline' ? true : false}/>
                    <ExtraPanelRight />
                </main>
            </div>
        </div>
    );
}
 
export default MainMenu;