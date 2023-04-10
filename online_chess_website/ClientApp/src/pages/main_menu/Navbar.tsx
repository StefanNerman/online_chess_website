import React from 'react'
import ProfileBox from '../../components/profile_info'
import LogoBig from '../../components/logo_big'

interface props {
    offline: boolean
}

const Navbar = (params: props) => {


    
    return (  
        <div className='floating-navbar-frame'>
            <div className='floating-navbar-screen'>
                <div className='logo-embed'>
                    <LogoBig />
                </div>
                <div className='floating-navbar-profilebox'>
                    {params.offline && 'offline'}
                    {params.offline || <ProfileBox info='idontknow whattoputhere' username='SampleMan3000' image=''/>}
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;