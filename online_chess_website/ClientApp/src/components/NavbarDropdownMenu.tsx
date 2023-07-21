import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signout } from '../data/datamethods'
import { hideMenu } from './NavbarDefault'

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
                    <li onClick={() => {
                                    hideMenu()
                                    navigate('menu')
                                }}>Main menu</li>
                    <li onClick={() => {
                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be signed in to view your profile!')
                                    hideMenu()
                                    navigate('profile')
                                }}>My profile</li>
                    <li onClick={() => {
                                    hideMenu()
                                    navigate('news')
                                }}>News</li>
                    <li onClick={() => {
                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be singed in to view your socials!')
                                    hideMenu()
                                    navigate('/social')
                                }}>Social</li>
                    <li onClick={() => {
                                    hideMenu()
                                    navigate('settings')
                                }}>Settings</li>
                    <li onClick={() => {handleSignout()}}>Sign out</li>
                </ul>
            </div>
        </div>
    );
}
 
export default NavbarDropdownMenu;