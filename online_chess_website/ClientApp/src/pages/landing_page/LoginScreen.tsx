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
                callback={() => {props.setLogin('login')}}
                mousein={() => {}} mouseout={() => {}}/>
                <label>Don't have an account yet?</label>
                <BtnMtBig  text='Create account' 
                callback={() => {props.setLogin('signup')}}
                mousein={() => {}} mouseout={() => {}}/>
                <label>Don't want to play online?</label>
                <BtnMtBig  text='Play offline' 
                callback={() => {playOffline()}}
                mousein={() => {}} mouseout={() => {}}/>
            </div>
        </div>
    );
}
 
export default LoginScreen;