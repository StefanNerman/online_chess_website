import React from 'react'
import './style.css'
import BtnMtBig from '../../components/btn_maintheme_big'

interface propsObj {
    setLogin: any //its a setState
}

const LoginScreen = (props: propsObj) => {

    function playOffline(){
        props.setLogin('offline')
    }

    return (  
        <div className='login-screen'>
                <h1>Log In</h1>
                <div className='login-panel'>
                <label>Already a member?</label>
                <BtnMtBig  text='Log in' 
                onClick={() => {props.setLogin('login')}}/>
                <label>Don't have an account yet?</label>
                <BtnMtBig  text='Create account' 
                onClick={() => {props.setLogin('signup')}}/>
                <label>Don't want to play online?</label>
                <BtnMtBig  text='Play offline' 
                onClick={() => {playOffline()}}/>
            </div>
        </div>
    );
}
 
export default LoginScreen;