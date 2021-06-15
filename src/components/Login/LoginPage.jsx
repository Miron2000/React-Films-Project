import React, {useState} from 'react';
import './LoginPage.css';


function LoginPage(props) {

    return (
        <form class='box indentation' method='post'>
            <h1>Login</h1>
            <input type='text' name='' placeholder='Username'/>
            <input type='text' name='' placeholder='Password'/>
            <input type='submit' name='' value='Login'/>
        </form>
    );
}

export default LoginPage;