import React from 'react'
import LogoSmall from './components/logo_small'

interface params {
    offline: boolean
}

const NavbarDefault = (params: params) => {

    function expandMenu(){
        // make it so that if the gap between the edge of the screen and the left edge of the box is too small
        // then the box will just strech to cover the entire width of the screen
    }


    return (  
        <div className='navbar'>
            <div className='navbar-screen'>
                <div className='logo-embed-default-nav'>
                    <LogoSmall />
                </div>
                <div className='navbar-expandmenu-box'>
                    <button onClick={expandMenu}>
                        
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default NavbarDefault;