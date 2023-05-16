import React, {useState} from 'react'
import {useForm} from '../../hooks/formHooks';
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import CheckboxText from '../../components/checkbox_text_1'
import * as api from '../../api/http_calls'
import { isStringAllowed, createSession } from './LandingPage'
import { addRedAsterix } from '../../utils/visual_prompts'
import { useNavigate } from 'react-router-dom'

interface propsObj {
    setLogin: any //its a setState
}

let isUsernameValid = false
let isPasswordValid = false

const Signup = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({checked: false})
    const navigate = useNavigate()

    function clickUserAgreementLink() {
        alert('epic troll')
    }

    function doesUserNameExist(e: any){ 
        let value = e.target.value 
        if(!isStringAllowed(value, false)) return
        if(!value) return
        api.axiosGet(`api/signup/${value ? value : ''}`)
        .then(response => {
            let alertText = document.getElementById('belowUsernameAlert')!
            if(!response.data){         
                alertText.innerText = 'Username taken!'
                isUsernameValid = false
                return
            }
            alertText.innerText = ''
            isUsernameValid = true
            setLoginInfo(e.target.name, value)})
        .catch(response => {console.log('ERROR: ', response)})
    }

    function onSubmit(e: any){
        e.preventDefault()
        if(!isAllInfoProvided()) return
        console.log('SUBMIT:', loginInfo)
        submitData(loginInfo)
    }

    function submitData(data: any){
        let sendData = {
            username: data.username,
            password: data.password
        }
        api.axiosPost('api/signup', sendData)
        .then(response => {
            response.data ? signupComplete(response.data) : alert('Something went wrong.')
        })
        .catch(response => {
            console.log('ERROR: ', response)
            alert('Something went wrong.')
        })
    }

    async function signupComplete(userId: number){
        sessionStorage.setItem('username', loginInfo.username)
        sessionStorage.setItem('userId', userId.toString())
        sessionStorage.setItem('profileExists', 'false')
        await createSession(userId)
        navigate('/main-menu')
    }

    function isAllInfoProvided(): boolean {
        let out = true
        if(!loginInfo.checked) {
            addRedAsterix(document.getElementById('userAgreementBox')!)
            out = false} else document.getElementById('userAgreementBox')?.classList.remove('asterix-red-left')
        if(!loginInfo.username) {
            addRedAsterix(document.getElementById('usernamePromptHolder')!)
            out = false} else document.getElementById('usernamePromptHolder')?.classList.remove('asterix-red-left')
        if(!loginInfo.password) {
            addRedAsterix(document.getElementById('passwordPromptHolder')!)
            out = false} else document.getElementById('passwordPromptHolder')?.classList.remove('asterix-red-left')
        if(!isUsernameValid) out = false
        if(!isPasswordValid) out = false
        return out
    }
    
   
    return (  
        <div className='login-screen'>
            <h1>
                Sign Up
                <BackButton1 onClick={() => {props.setLogin('')}} style={{left: '0.5rem', top: '50%'}}/>
            </h1>
            <form className='login-panel' onSubmit={(e) => onSubmit(e)} id='signupForm'>
                <label id='usernameInputLabel'>Username</label>
                <div className='text-input-container'>
                    <span id='usernamePromptHolder' data-testid='signup-username-prompt'></span>
                    <input type='text' name='username' id='signupUsername' 
                    onChange={(e) => doesUserNameExist(e)}></input>
                    <p id='belowUsernameAlert' className='alert-text-red automargin'></p>
                </div>
                <label>Password</label>
                <div className='text-input-container'>
                    <span id='passwordPromptHolder' data-testid='signup-password-prompt'></span>
                    <input type='password' name='password' id='signupPassword'
                    onChange={(e) => {
                        isPasswordValid = true
                        isStringAllowed(e.target.value, true) && setLoginInfo('password', e.target.value)
                    }}></input>
                </div>
                <CheckboxText text='I accept the terms and conditions' linkOnClick={clickUserAgreementLink}
                onCheck={() => {setLoginInfo('checked', true)}} 
                onUnCheck={() => {setLoginInfo('checked', false)}} 
                checked={false} id='userAgreementBox'></CheckboxText>
                <ButtonMtSmall text='submit' onClick={() => {}} />
                <p id='bottomAlertText' className='alert-text-red automargin'></p>
            </form>
        </div>
    );
}
 
export default Signup;