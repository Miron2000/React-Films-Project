import React from 'react';
import './Hamburger-menu.css';
import {NavLink} from "react-router-dom";

const HamburgerMenu = () => {
    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox"/>
            <label className="menu__btn" htmlFor="menu__toggle"><span></span></label>
            <ul className="menu__box">
                <li><NavLink className="menu__item" to="/films">Table</NavLink></li>
                <li><NavLink className="menu__item" to="/login">Login</NavLink></li>
            </ul>
        </div>
    );
}

export default HamburgerMenu;