import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { signout } from '../data/datamethods'
import NarrowSettingsComponent from './NarrowModeSettingsComponent'

export let settingsToggle: any
export let settingsToggleStatus: any

const NavbarDropdownMenu = () => {

    const navigate = useNavigate()

    const [settingsOpen, setSettingsOpen] = useState(false)

    useEffect(() => {
        settingsToggle = setSettingsOpen
        settingsToggleStatus = settingsOpen
    }, [settingsOpen])

    function handleSignout() {
        signout()
        window.location.href = 'http://localhost:44417/'
    }

    return (  
        <div className='dropdownmenu-frame fully-removed' id='dropdown' data-testid='dropdown'>
            <div className='dropdownmenu-screen fully-removed' id='dropdown-movepiece' data-testid='dropdown-movepiece'>
                {
                settingsOpen ||
                <ul>
                    <li onClick={() => {
                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be signed in to view your profile!')
                                    navigate('/profile')
                                }}>My profile</li>
                    <li onClick={() => {navigate('/news')}}>News</li>
                    <li onClick={() => {
                                    if(sessionStorage.getItem('loginOperation') === 'offline') return alert('You must be singed in to view your socials!')
                                    navigate('/social')
                                }}>Social</li>
                    <li onClick={() => {
                                    if(settingsOpen) return setSettingsOpen(false)
                                    setSettingsOpen(true)
                                }}>Settings</li>
                    <li onClick={() => {handleSignout()}}>Sign out</li>
                </ul>
                }
                {
                settingsOpen &&
                <NarrowSettingsComponent />
                }
            </div>
        </div>
    );
}
 
export default NavbarDropdownMenu;