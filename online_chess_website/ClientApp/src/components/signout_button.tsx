import React from 'react'
import { signout } from '../data/datamethods'


const SignoutButton = () => {

    function handleSignout() {
        signout()
        window.location.href = 'http://localhost:44417/'
    }

    return (  
        <button className='signout-button-frame' onClick={handleSignout}>
            Sign out
        </button>
    );
}
 
export default SignoutButton;