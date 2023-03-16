import React from 'react'
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'

interface propsObj {
    setLogin: any //its a setState
}

const Login = (props: propsObj) => {
    return (  
        <div className='login-screen'>
            <h1>
                Log In
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel'>
                <label>username</label>
                <input type='text' name='usernameInput'></input>
                <label>password</label>
                <input type='password' name='passwordInput' style={{marginBottom: '1rem'}}></input>
                <ButtonMtSmall text='submit' callback={() => {}} />
            </form>
        </div>
    );
}
 
export default Login;