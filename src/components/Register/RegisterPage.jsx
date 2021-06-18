import React, {useEffect, useState} from 'react';
import './RegisterPage.css';
import axios from 'axios';

function RegisterPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [emailError, setEmailError] = useState('Email should not be empty');
    const [passwordError, setPasswordError] = useState('Password should not be empty');
    const [formValid, setFormValid] = useState(false);


    useEffect(() => {
        if(emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Incorrect email')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 8 || e.target.value.length > 16){
            setPasswordError('Password must be more than 8 and less than 16');
            if(!e.target.value) {
                setPasswordError('Password should not be empty');
            }
        }else {
            setPasswordError('');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;

            case 'password':
                setPasswordDirty(true);
                break;
        }
    }

    return (
        <form className='box indentation' method='post' action='/register'>
            <h1>Sign Up</h1>
            <div>
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                <input value={email} onChange={e => emailHandler(e)} type='email' name='email'
                       placeholder='Email' onBlur={blurHandler}/>
            </div>
            <div>
                {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                <input value={password} onChange={e => passwordHandler(e)} type='password'
                       name='password' placeholder='Password' onBlur={blurHandler}/>
            </div>

            <input disabled={!formValid} type='submit' name='' value='Register'/>
        </form>
    );
}

export default RegisterPage;