import React, { useState } from 'react'
import './style.css'
import GamePanel from './GamePanel'
import Navbar from './Navbar'
import ExtraPanelRight from './ExtraPanelRight'
import ExtraPanelLeft from './ExtraPanelLeft'
import NavbarDefault from '../../NavbarDefault';


const MainMenu = () => {
    
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 800 ? true : false)

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