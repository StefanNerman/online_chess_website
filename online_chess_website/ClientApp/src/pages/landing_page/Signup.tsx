import React, {useState} from 'react'
import {useForm} from '../../hooks/formHooks';
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import CheckboxText from '../../components/checkbox_text_1'
import * as api from '../../http_calls'

interface propsObj {
    setLogin: any //its a setState
}


const Signup = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({checked: false})
    let isUsernameValid = false
    let isPasswordValid = false

    function clickUserAgreementLink() {
        alert('epic troll')
    }

    function doesUserNameExist(e: any){ 
        let value = e.target.value 
        if(!isStringAllowed(value)) return

        /*
        api.axiosPost('/is-username-taken', {username: value})
        .then(response => {
            //if username taken
            //let alertText = document.getElementById('belowUsernameAlert')!
            //alertText.innerText = 'Username taken!'
            //else
            isUsernameValid = true
            setLoginInfo(e.target.name, value)})
        .catch(response => {})
        */

        //delete below later
        isUsernameValid = true
        setLoginInfo(e.target.name, value)
    }

    function isStringAllowed(string: string): boolean {
        if(string.includes(`'`)) return badSymbolAlert()
        if(string.includes(`"`)) return badSymbolAlert()
        if(string.includes('`')) return badSymbolAlert()
        let alertText = document.getElementById('bottomAlertText')!
        alertText.innerText = ''

        function badSymbolAlert(): boolean {
            let alertText = document.getElementById('bottomAlertText')!
            alertText.innerText = `', ",` + ' ` signs are not allowed!'
            return false
        }
        return true
    }


    function onSubmit(e: any){
        //remember to change all ' to ` and prevent other signs that you dont want to be used
        e.preventDefault()
        if(!isAllInfoProvided()) return
        console.log('SUBMIT: ' + loginInfo)
        submitData(loginInfo)
    }

    function submitData(data: any){
        let sendData = {
            username: data.username,
            password: data.password
        }
        
    }
    function isAllInfoProvided(): boolean {
        let out = true
        if(!loginInfo.checked) {
            addRequiredPromt(document.getElementById('userAgreementBox')!)
            out = false} else document.getElementById('userAgreementBox')?.classList.remove('asterix-red-left')
        if(!loginInfo.username) {
            addRequiredPromt(document.getElementById('usernamePromptHolder')!)
            out = false} else document.getElementById('usernamePromptHolder')?.classList.remove('asterix-red-left')
        if(!loginInfo.password) {
            addRequiredPromt(document.getElementById('passwordPromptHolder')!)
            out = false} else document.getElementById('passwordPromptHolder')?.classList.remove('asterix-red-left')
        if(!isUsernameValid) out = false
        if(!isPasswordValid) out = false
        return out
    }

    function addRequiredPromt(element: HTMLElement | undefined){
        element?.classList.add('asterix-red-left')
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
                    onChange={(e) => isStringAllowed(e.target.value) && setLoginInfo('password', e.target.value)}></input>
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