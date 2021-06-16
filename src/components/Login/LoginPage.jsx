import React, {useState} from 'react';
import './LoginPage.css';
import axios from "axios";


function LoginPage(props) {

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');

    const registration = () => {
        axios({
            method: 'POST',
            data: {
                email: loginUserEmail,
                password: loginUserPassword
            },
            withCredentials: true,
            url: `http://localhost:3000/login`
        })
            .then((res) => console.log(res))
    };

    return (
        <form class='box indentation' method='post' action='/login'>
            <h1>Sign In</h1>
            <div>
                <label htmlFor='email'>Email</label>
                <input value={loginUserEmail} onChange={(event) => setLoginUserEmail(event.target.value)} type='email'
                       name='email' placeholder='Email'/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input value={loginUserPassword} onChange={(event) => setLoginUserPassword(event.target.value)}
                       type='password' name='password' placeholder='Password'/>
            </div>

            <input type='submit' name='' value='Login'/>
        </form>
    );
}

export default LoginPage;