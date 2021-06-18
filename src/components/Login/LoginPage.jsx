import React, {useState} from 'react';
import './LoginPage.css';
import axios from "axios";


function LoginPage(props) {

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');


    return (
        <form className='box indentation' method='post' action='/login'>
            <h1>Log in</h1>
            <div>
                <input value={loginUserEmail} onChange={(event) => setLoginUserEmail(event.target.value)} type='email'
                       name='email' placeholder='Email'/>
            </div>
            <div>
                <input value={loginUserPassword} onChange={(event) => setLoginUserPassword(event.target.value)}
                       type='password' name='password' placeholder='Password'/>
            </div>
            <input type='submit' name='' value='Login'/>
        </form>
    );
}

export default LoginPage;