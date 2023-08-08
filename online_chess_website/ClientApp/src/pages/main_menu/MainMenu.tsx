import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './style.css'
import Navbar from './FloatingNavbar'
import NavbarDefault from '../../components/NavbarDefault';

const MainMenu = () => {

    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 800 ? true : false)

    const navigate = useNavigate()

    useEffect(() => {
        if(sessionStorage.getItem('profileExists') !== 'true') return createNewProfile()
        console.log(window.location)
        if(window.location.href === 'http://localhost:44417/main-menu') navigate('/main-menu/menu')
    }, [])

    window.addEventListener('resize', () => {
        let width = window.innerWidth
        if(width <= 800){
            setIsScreenWide(false)
        } 
        if(width > 800){
            setIsScreenWide(true)
        }
    })

    //this runs if someone signs in
    function createNewProfile(){ 
        sessionStorage.setItem('profileExists', 'true')
    }

    let loginOperation = sessionStorage.getItem('loginOperation')
    if(!loginOperation) loginOperation = 'offline'

    return (  
        <>
        {!isScreenWide && <NavbarDefault offline={loginOperation === 'offline' ? true : false}/>}
        <div className="mainmenu">
            <div className='mainmenu-container'>
                <Navbar offline={loginOperation === 'offline' ? true : false}/>
                <main>  
                    <Outlet />
                </main> 
            </div>
        </div>
        </>
    );
}
 
export default MainMenu;