import React, {useState} from 'react';
import './RegisterPage.css';
import axios from 'axios';


function RegisterPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registration = () => {
        axios({
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: `http://localhost:3000/register`
        })
            .then((res) => console.log(res))
    };

    return (
        <form class='box indentation' method='post' action='/register'>
            <h1>Sign Up</h1>
            <div>
                <label for='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' name='email'
                       placeholder='Email'/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type='password'
                       name='password' placeholder='Password'/>
            </div>

            <input type='submit' name='' value='Register' onClick={() => registration()}/>
        </form>
    );
}

// onClick={() => registration(email, password)}
export default RegisterPage;