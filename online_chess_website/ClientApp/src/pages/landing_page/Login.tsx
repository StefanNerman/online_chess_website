import React from 'react'
import BackButton1 from '../../components/back_btn_1';
import ButtonMtSmall from '../../components/btn_maintheme_small'
import {useForm} from '../../hooks/formHooks'

interface propsObj {
    setLogin: any //its a setState
}

const Login = (props: propsObj) => {

    const [loginInfo, setLoginInfo] = useForm({})


    function onSubmit(e: any){
        e.preventDefault()
        console.log(loginInfo)
    }

    return (  
        <div className='login-screen'>
            <h1>
                Log In
                <BackButton1 callback={() => {props.setLogin('')}} fromLeft='0.5rem' fromTop='50%'/>
            </h1>
            <form className='login-panel' onSubmit={(e) => onSubmit(e)}>
                <label>username</label>
                <input type='text' name='usernameInput' 
                onChange={e => setLoginInfo('username', e.target.value)}></input>
                <label>password</label>
                <input type='password' name='passwordInput' style={{marginBottom: '1rem'}}
                onChange={e => setLoginInfo('password', e.target.value)}></input>
                <ButtonMtSmall text='submit' callback={() => {}} />
            </form>
        </div>
    );
}
 
export default Login;