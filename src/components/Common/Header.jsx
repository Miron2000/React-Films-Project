import React, {useEffect, useState} from 'react';
import './Header.css';
import logo from "../../logo/logo.png";
import {NavLink} from "react-router-dom";
import HamburgerMenu from "./Hamburger-menu";

const Header = ({user}) => {

    const isAuthUser = user.userId && user.userId !== null;

    return (
        <header className="header">
            <div className="header__section">
                <div className="header__item"><img className="header__logo" src={logo} alt="logo"/></div>
                {isAuthUser ?
                    <>
                        <div className="header__item hover"><NavLink to="/">Cards</NavLink></div>
                        <div className="header__item hover"><NavLink to="/films">Table</NavLink></div>
                        <div className="header__item hover"><NavLink to="/addFilm">Add Film</NavLink></div>
                    </>
                    :
                    <>
                        <div className="header__item hover"><NavLink to="/">Cards</NavLink></div>
                        <div className="header__item hover"><NavLink to="/films">Table</NavLink></div>
                    </>
                }

            </div>
            <div className="header__section">
                {isAuthUser ?
                    <div className="header__item hover"><a href="/logout">Logout</a></div>
                    :
                    <>
                        <div className="header__item hover"><NavLink to="/login">Sign In</NavLink></div>
                        <div className="header__item hover"><NavLink to="/register">Sign Up</NavLink></div>
                    </>
                }
            </div>

            <HamburgerMenu isAuthUser={isAuthUser}/>
        </header>
    );
}

export default Header;