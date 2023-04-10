import React, {useState, useEffect} from 'react'
import './style.css'
import LoginScreen from './LoginScreen'
import Login from './Login'
import Signup from './Signup'
import Offline from './Offline'

export function isStringAllowed(string: string, isPassword: boolean): boolean {
    if(isPassword && string.length > 21) return badSymbolAlert(`Passwords cannot be over 21 letters long!`)
    if(!isPassword && string.length > 21) return badSymbolAlert(`Usernames cannot be over 21 letters long!`)
    if(string.includes(`'`)) return badSymbolAlert(`', " and ${'`'} signs are not allowed!`)
    if(string.includes(`"`)) return badSymbolAlert(`', " and ${'`'} signs are not allowed!`)
    if(string.includes('`')) return badSymbolAlert(`', " and ${'`'} signs are not allowed!`)
    if(string.includes(' ')) return badSymbolAlert(`Please do not use spaces!`)
    let alertText = document.getElementById('bottomAlertText')!
    alertText.innerText = ''

    function badSymbolAlert(message: string): boolean {
        let alertText = document.getElementById('bottomAlertText')!
        alertText.innerText = message
        return false
    }
    return true
}


const LandingPage = () => {

    const [loginOperation, setLoginOperation] = useState('')

    useEffect(() => {
        sessionStorage.setItem('loginOperation', loginOperation)
    }, [loginOperation])


    return (  
        <div className="landingpage">
            {loginOperation === '' && <LoginScreen setLogin={setLoginOperation}/>}
            {loginOperation === 'login' && <Login setLogin={setLoginOperation}/>}
            {loginOperation === 'signup' && <Signup setLogin={setLoginOperation}/>}
            {loginOperation === 'offline' && <Offline />}
        </div>
    );
}
 
export default LandingPage;