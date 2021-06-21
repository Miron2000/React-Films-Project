import React, {useEffect, useState} from 'react';

function LogoutPage(props) {

    return (
        <form className='box indentation' method='POST' action='/logout'>
            <h1>Logout</h1>
            <input type='submit' name='' value='Login'>Logout</input>
        </form>
    );
}

export default LogoutPage;