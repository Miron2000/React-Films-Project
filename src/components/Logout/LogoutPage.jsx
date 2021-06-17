import React, {useEffect, useState} from 'react';
import axios from "axios";


function LogoutPage(props) {

    const [status, setStatus] = useState('');
    // useEffect(() => {
    //     // DELETE request using axios inside useEffect React hook
    //     axios.delete('http://localhost:3000/logout')
    //         .then(() => setStatus('Delete successful'));
    //
    // }, []);
    async function logout() {
        await axios.delete('http://localhost:3000/logout');
        setStatus('Delete successful');
    }

    return (
        <form className='box indentation' method='POST' action='/logout'>
            <h1>Logout</h1>
            <input type='submit' name='' value='Login'>Logout</input>
        </form>
    );
}

export default LogoutPage;