import React, {useState} from 'react'
import useForm from '../../utils/useForm';
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import CheckboxText from '../../components/checkbox_text_1'

interface propsObj {
    setLogin: any //its a setState
}


const Signup = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm()

    function clickUserAgreementLink() {
        alert('epic troll')
    }

    function doesUserNameExist(e: any){ 
        let value = e.target.value 
        //api call to check for existing usernames 
        (setLoginInfo as any)('_name', e.target.value )
    }

    function onSubmit(e: any){
        //remember to change all ' to ` and prevent other signs that you dont want to be used
        e.preventDefault()
        
    }
    
    //tomorrow work on making the useForm custom hook working
    return (  
        <div className='login-screen'>
            <h1>
                Sign Up
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel' onSubmit={(e) => onSubmit(e)}>
                <label id='usernameInputLabel'>username</label>
                <input type='text' name='username' id='signupUsername' 
                onChange={(e) => doesUserNameExist(e)}></input>
                <label>password</label>
                <input type='password' name='password' id='signupPassword'
                onChange={(e) => (setLoginInfo as any)(e)}></input>
                <CheckboxText text='I accept the user agreement' linkOnClick={clickUserAgreementLink}
                onCheck={() => (setLoginInfo as any)('checked', true)} 
                onUnCheck={() => (setLoginInfo as any)('checked', false)} checked={false}/>
                <ButtonMtSmall text='submit' callback={() => {}} />
            </form>
        </div>
    );
}
 
export default Signup;