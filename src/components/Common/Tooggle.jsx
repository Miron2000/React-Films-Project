import React from 'react';
import './Toogle.css';

const Toogle = ({setDarkMode, isDarkMode}) => {

    return(
        <div className='theme'>
            <span className="sun">🌞</span>
            <div className="switch-checkbox">
                <label className="switch">
                    <input type="checkbox" onChange={() => {setDarkMode(!isDarkMode)}}/>
                    <span className="slider round"> </span>
                </label>
            </div>
            <span className="moon">🌜</span>
        </div>
    );
}

export default Toogle;