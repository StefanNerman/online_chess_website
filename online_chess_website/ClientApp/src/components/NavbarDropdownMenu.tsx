import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signout } from '../data/datamethods';

const NavbarDropdownMenu = () => {

    const navigate = useNavigate()

    function handleSignout() {
        signout()
        window.location.href = 'http://localhost:44417/'
    }

    return (  
        <div className='dropdownmenu-frame fully-removed' id='dropdown' data-testid='dropdown'>
            <div className='dropdownmenu-screen fully-removed' id='dropdown-movepiece' data-testid='dropdown-movepiece'>
                <ul>
                    <li onClick={() => {navigate('/profile')}}>My profile</li>
                    <li onClick={() => {navigate('/news')}}>News</li>
                    <li onClick={() => {navigate('/social')}}>Social</li>
                    <li onClick={() => {navigate('/settings')}}>Settings</li>
                    <li onClick={() => {handleSignout()}}>Sign out</li>
                </ul>
            </div>
        </div>
    );
}
 
export default NavbarDropdownMenu;