import React, {useState, useEffect} from 'react'
import './style.css'
import LoginScreen from './LoginScreen'
import Login from './Login'
import Signup from './Signup'
import Offline from './Offline'
import * as api from './../../api/http_calls'

export function isStringAllowed(string: string, isPassword: boolean): boolean {
    let isStringIllegal = checkString(string, isPassword)
    if(isStringIllegal) return badSymbolAlert(isStringIllegal)
    return true
}
export function checkString(str: string, isPassword: boolean): string{
    if(isPassword && str.length > 21) return `Passwords cannot be over 21 letters long!`
    if(!isPassword && str.length > 21) return `Usernames cannot be over 21 letters long!`
    if(str.includes(`'`)) return `', " and ${'`'} signs are not allowed!`
    if(str.includes(`"`)) return `', " and ${'`'} signs are not allowed!`
    if(str.includes('`')) return `', " and ${'`'} signs are not allowed!`
    if(str.includes(' ')) return `Please do not use spaces!`
    return ''
}
function badSymbolAlert(message: string): boolean {
    let alertText: HTMLElement = document.getElementById('bottomAlertText')!
    if('innerText' in alertText) alertText.innerText = message
    return false
}

export async function createSession(userId: number){
    return new Promise((resolve, reject) => {
        api.axiosGet(`api/sessions/${userId}`)
        .then(result => {
            console.log('session token created -> ', result)
            sessionStorage.setItem("sessionToken", result.data.token)
            document.cookie = `ST=${result.data.token};expires=Fri, 18 September 2099 11:00:00 UTC; path=/`
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
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