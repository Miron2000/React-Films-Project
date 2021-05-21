import React from 'react';
import './Header.css';
import logo from "../../logo/logo";
import {NavLink} from "react-router-dom";
import HamburgerMenu from "./Hamburger-menu";

const Header = () => {
    return (
        <header className="header">
            <div className="header__section">
                <div className="header__item"><img className="header__logo" src={logo} alt="logo"/></div>
                <div className="header__item hover"><NavLink to="/films">Table</NavLink></div>
            </div>
            <div className="header__section">
                <div className="header__item hover"><NavLink to="/login">Login</NavLink></div>
            </div>

            <HamburgerMenu/>
        </header>
    );
}

export default Header;