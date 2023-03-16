import React from 'react'
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import CheckboxText from '../../components/checkbox_text_1'

interface propsObj {
    setLogin: any //its a setState
}

const Signup = (props: propsObj) => {


    const nameInput = document.getElementById('signupUsername')
    const passInput = document.getElementById('signupPassword')
    const usernameLabel = document.getElementById('usernameInputLabel')

    function clickUserAgreementLink() {
        alert('epic troll')
    }

    function doesUserNameExist(){
        usernameLabel!.innerText = 'username'
        //apicall goes here
    }

    function onSubmit(){
        
    }


    return (  
        <div className='login-screen'>
            <h1>
                Sign Up
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel'>
                <label id='usernameInputLabel'>username</label>
                <input type='text' name='usernameInput' id='signupUsername' 
                onChange={doesUserNameExist}></input>
                <label>password</label>
                <input type='password' name='passwordInput' id='signupPassword'></input>
                <CheckboxText text='I accept the user agreement' linkOnClick={clickUserAgreementLink}
                onCheck={null} onUnCheck={null}/>
                <ButtonMtSmall text='submit' callback={() => onSubmit()} />
            </form>
        </div>
    );
}
 
export default Signup;