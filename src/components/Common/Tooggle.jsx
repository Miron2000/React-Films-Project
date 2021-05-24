import React from 'react';
import './Toogle.css';

const Toogle = (props) => {


    return(
        <div className='theme'>
            <span className="sun">🌞</span>
            <div className="switch-checkbox">
                <label className="switch">
                    <input type="checkbox" onChange={() => {props.setDarkModePage(!props.darkMode)}}/>
                    <span className="slider round"> </span>
                </label>
            </div>
            <span className="moon">🌜</span>
        </div>
    );
}

export default Toogle;