import React from 'react';
import './Hamburger-menu.css';
import {NavLink} from "react-router-dom";

const HamburgerMenu = (props) => {
    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox"/>
            <label className="menu__btn" htmlFor="menu__toggle"><span className='cross'></span></label>
            <ul className="menu__box">
                {props.isAuthUser ?
                    <>
                        <li className="menu__item"><NavLink to="/">Cards</NavLink></li>
                        <li className="menu__item"><NavLink to="/films">Table</NavLink></li>
                        <li className="menu__item"><NavLink to="/addFilm">Add Film</NavLink></li>
                        <li className="menu__item"><a href="/logout">Logout</a></li>
                    </>
                    :
                    <>
                        <li className="menu__item"><NavLink to="/">Cards</NavLink></li>
                        <li className="menu__item"><NavLink to="/films">Table</NavLink></li>
                        <li className="menu__item"><NavLink to="/login">Sign In</NavLink></li>
                        <li className="menu__item"><NavLink to="/register">Sign Up</NavLink></li>
                    </>
                }
            </ul>
        </div>
    );
}

export default HamburgerMenu;