import React, {useState} from 'react'
import LogoSmall from './components/logo_small'
import NavbarDropdownMenu from './NavbarDropdownMenu'
import * as visual from './utils/visual_changes'

interface params {
    offline: boolean
}

const NavbarDefault = (params: params) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMenu(){
        isMenuOpen ? hideMenu() : expandMenu()
    }

    function expandMenu(){
        const menu = document.getElementById('dropdown')!
        const movepiece = document.getElementById('dropdown-movepiece')!
        movepiece.style.animationName = ''
        setIsMenuOpen(true)
        visual.unhide(menu)
        visual.unhide(movepiece)
        expandAnimation()
    }

    function hideMenu(){
        const menu = document.getElementById('dropdown')!
        const movepiece = document.getElementById('dropdown-movepiece')!
        setIsMenuOpen(false)
        hideAnimation()
        movepiece.addEventListener('animationend', () => {
            movepiece.removeEventListener('animationend', () => {})
            if(movepiece.style.animationName === 'expandFromTop') return
            visual.hide(menu)
            visual.hide(movepiece)
        })
    }

    function expandAnimation(){
        const movepiece = document.getElementById('dropdown-movepiece')!
        movepiece.style.animationName = 'expandFromTop'
    }

    function hideAnimation(){
        const movepiece = document.getElementById('dropdown-movepiece')!
        movepiece.style.animationName = 'shrinkFromBottom'
    }


    return (  
        <div className='navbar'>
            <div className='navbar-screen'>
                <div className='logo-embed-default-nav'>
                    <LogoSmall />
                </div>
                <div className='navbar-expandmenu-box'>
                    <button onClick={handleMenu}>
                        
                    </button>
                </div>
                <div className='navbar-dropdown-container'>
                    <NavbarDropdownMenu />
                </div>
            </div>
        </div>
    );
}
 
export default NavbarDefault;