import React from 'react'
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import { useForm } from '../../hooks/formHooks'
import { isStringAllowed } from './LandingPage'
import * as api from '../../http_calls'
import { addRedAsterix } from '../../utils/visual_prompts'

interface propsObj {
    setLogin: any //its a setState
}

const Login = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({username: '', password: ''})


    function onSubmit(e: any){
        e.preventDefault()
        if(!isAllInfoProvided()) return
        console.log('SUBMIT:', loginInfo)
        submitData(loginInfo)
    }

    function isAllInfoProvided(){
        let out = true
        if(!loginInfo.username){
            addRedAsterix(document.getElementById('usernamePromptHolder')!)
            out = false} 
        else document.getElementById('usernamePromptHolder')?.classList.remove('asterix-red-left')
        if(!loginInfo.password){
            addRedAsterix(document.getElementById('passwordPromptHolder')!)
            out = false} 
        else document.getElementById('passwordPromptHolder')?.classList.remove('asterix-red-left')
        return out
    }

    function submitData(data: any){
        let sendData = {
            username: data.username,
            password: data.password
        }
        return
        api.axiosGet('api/validate_login', sendData)
        .then(response => {
            console.log(response)
            loginComplete()
        })
        .catch(error => {
            console.log(error)
            alert('Username or password incorrect.')
        })
    }

    function loginComplete(){

    }

    return (  
        <div className='login-screen'>
            <h1>
                Log In
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel' onSubmit={(e) => onSubmit(e)}>
                <label>username</label>
                <div className='text-input-container'>
                    <span id='usernamePromptHolder'></span>
                    <input type='text' name='username' 
                    onChange={e => {
                        isStringAllowed(e.target.value, false) && setLoginInfo('username', e.target.value)
                    }}></input>
                </div>
                <label>password</label>
                <div className='text-input-container'>
                    <span id='passwordPromptHolder'></span>
                    <input type='password' name='password' style={{marginBottom: '1rem'}}
                    onChange={e => {
                        isStringAllowed(e.target.value, true) && setLoginInfo('password', e.target.value)
                    }}></input>
                </div>
                <ButtonMtSmall text='submit' callback={() => {}} />
                <p id='bottomAlertText' className='alert-text-red automargin'></p>
            </form>
        </div>
    );
}
 
export default Login;