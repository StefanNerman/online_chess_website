import React from 'react'
import { settingsToggle, settingsToggleStatus } from './NavbarDropdownMenu';


const NarrowSettingsComponent = () => {
    return (  
        <div>
            <button onClick={() => {
                if(settingsToggleStatus) return settingsToggle(false)
                settingsToggle(true)
            }}>
                go back
            </button>
            settings
        </div>
    )
}
 
export default NarrowSettingsComponent;