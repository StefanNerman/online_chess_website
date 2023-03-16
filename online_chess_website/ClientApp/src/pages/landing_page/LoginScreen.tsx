import React from 'react'
import './style.css'
import BtnMtBig from '../../components/btn_maintheme_big'
import { playOffline } from './LandingPage'


interface propsObj {
    setLogin: any //its a setState
}

const LoginScreen = (props: propsObj) => {
    return (  
        <div className='login-screen'>
                <h1>Log In</h1>
                <div className='login-panel'>
                <label>Already a member?</label>
                <BtnMtBig  text='Log in' 
                callback={() => {props.setLogin('login')}}/>
                <label>Don't have an account yet?</label>
                <BtnMtBig  text='Create account' 
                callback={() => {props.setLogin('signup')}}/>
                <label>Don't want to play online?</label>
                <BtnMtBig  text='Play offline' 
                callback={() => {playOffline()}}/>
            </div>
        </div>
    );
}
 
export default LoginScreen;