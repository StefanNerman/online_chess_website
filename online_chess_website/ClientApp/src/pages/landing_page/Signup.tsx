import React, {useState} from 'react'
import {useForm} from '../../hooks/formHooks';
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import CheckboxText from '../../components/checkbox_text_1'
import * as api from '../../http_calls'
import { isStringAllowed } from './LandingPage'
import { addRedAsterix } from '../../utils/visual_prompts'

interface propsObj {
    setLogin: any //its a setState
}

let isUsernameValid = false
let isPasswordValid = false

const Signup = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({checked: false})

    function clickUserAgreementLink() {
        alert('epic troll')
    }

    function doesUserNameExist(e: any){ 
        let value = e.target.value 
        if(!isStringAllowed(value, false)) return
        api.axiosGet(`api/signup/${value}`)
        .then(response => {
            let alertText = document.getElementById('belowUsernameAlert')!
            if(!response.data){         
                alertText.innerText = 'Username taken!'
                return
            }
            alertText.innerText = ''
            isUsernameValid = true
            setLoginInfo(e.target.name, value)})
        .catch(response => {console.log(response)})
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
            console.log(response)
        })
        .catch(response => {
            console.log(response)
        })
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
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel' onSubmit={(e) => onSubmit(e)} id='signupForm'>
                <label id='usernameInputLabel'>Username</label>
                <div className='text-input-container'>
                    <span id='usernamePromptHolder'></span>
                    <input type='text' name='username' id='signupUsername' 
                    onChange={(e) => doesUserNameExist(e)}></input>
                    <p id='belowUsernameAlert' className='alert-text-red automargin'></p>
                </div>
                <label>Password</label>
                <div className='text-input-container'>
                    <span id='passwordPromptHolder'></span>
                    <input type='password' name='password' id='signupPassword'
                    onChange={(e) => {
                        isPasswordValid = true
                        isStringAllowed(e.target.value, true) && setLoginInfo('password', e.target.value)
                    }}></input>
                </div>
                <CheckboxText text='I accept the user agreement' linkOnClick={clickUserAgreementLink}
                onCheck={() => {setLoginInfo('checked', true)}} 
                onUnCheck={() => {setLoginInfo('checked', false)}} 
                checked={false} elementIdName='userAgreementBox'></CheckboxText>
                <ButtonMtSmall text='submit' callback={() => {}} />
                <p id='bottomAlertText' className='alert-text-red automargin'></p>
            </form>
        </div>
    );
}
 
export default Signup;