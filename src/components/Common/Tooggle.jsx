import React from 'react';
import './Toogle.css';

const Toogle = ({setDarkMode, isDarkMode}) => {

    return (
        <div className='theme'>
            <div className="switch-checkbox">
                <label className="switch">
                    <input type="checkbox" onChange={() => {
                        setDarkMode(!isDarkMode)
                    }}/>
                    {isDarkMode ? <span className="checked round"> </span> : <span className="notChecked round"> </span>}
                </label>
            </div>
        </div>
    );
}

export default Toogle;