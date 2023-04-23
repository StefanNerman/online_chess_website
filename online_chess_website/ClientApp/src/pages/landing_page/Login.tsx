import React from 'react'
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import { useForm } from '../../hooks/formHooks'
import { isStringAllowed, createSession } from './LandingPage'
import * as api from '../../api/http_calls'
import { addRedAsterix } from '../../utils/visual_prompts'
import { useNavigate } from 'react-router-dom'

interface propsObj {
    setLogin: any //its a setState
}

const Login = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({username: '', password: ''})
    const navigate = useNavigate()

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
        api.axiosPost(`api/login`, data)
        .then(response => {
            console.log(response)
            response.data? loginComplete(response.data) : alert('Username or password incorrect.')
        })
        .catch(error => {
            console.log('ERROR: ', error)
            alert('Something went wrong.')
        })
    }

    function loginComplete(userId: number){
        sessionStorage.setItem('username', loginInfo.username)
        sessionStorage.setItem('userId', userId.toString())
        sessionStorage.setItem('profileExists', 'true')
        createSession(userId)
        navigate('/main-menu')
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
                    <span id='usernamePromptHolder' data-testid='login-username-prompt'></span>
                    <input type='text' name='username' 
                    onChange={e => {
                        isStringAllowed(e.target.value, false) && setLoginInfo('username', e.target.value)
                    }}></input>
                </div>
                <label>password</label>
                <div className='text-input-container'>
                    <span id='passwordPromptHolder' data-testid='login-password-prompt'></span>
                    <input type='password' name='password' style={{marginBottom: '1rem'}}
                    onChange={e => {
                        isStringAllowed(e.target.value, true) && setLoginInfo('password', e.target.value)
                    }}></input>
                </div>
                <ButtonMtSmall text='submit' callback={() => {}} mousein={() => {}} mouseout={() => {}} data-testid='login-submit-button'/>
                <p id='bottomAlertText' className='alert-text-red automargin'></p>
            </form>
        </div>
    );
}
 
export default Login;