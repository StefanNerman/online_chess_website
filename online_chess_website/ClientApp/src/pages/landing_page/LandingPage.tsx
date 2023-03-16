import React, {useState} from 'react'
import './style.css'
import LoginScreen from './LoginScreen'
import Login from './Login'
import Signup from './Signup'


export function playOffline(){

}

const LandingPage = () => {

    const [loginOperation, setLoginOperation] = useState('')



    return (  
        <div className="landingpage">
            {loginOperation === '' && <LoginScreen setLogin={setLoginOperation}/>}
            {loginOperation === 'login' && <Login setLogin={setLoginOperation}/>}
            {loginOperation === 'signup' && <Signup setLogin={setLoginOperation}/>}
        </div>
    );
}
 
export default LandingPage;