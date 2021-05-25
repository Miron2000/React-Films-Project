import React, {useEffect, useState} from 'react';
import Header from "./components/Common/Header";
import FilmsPage from "./containers/FilmsPage";
import Login from "./containers/Login";
import Footer from "./components/Common/Footer";
import './index.css';
import {BrowserRouter, Route} from "react-router-dom";
import Tooggle from "./components/Common/Tooggle";
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode as setDarkModeAction} from "./store/actions/actions";
import {Theme} from "./store/reducers/reducers";

const App = () => {
    const isDarkMode = useSelector((state) => state.Theme.darkTheme);

    const dispatch = useDispatch();
    const setDarkMode = (theme) => {
        dispatch(setDarkModeAction(theme))
    }


    return (
        <BrowserRouter>
            <div className={isDarkMode ? "dark-mode" : "light-mode"}>
                <div className="page">
                    <Header/>
                    <Tooggle setDarkMode={setDarkMode} isDarkMode={isDarkMode}/>
                    <section className="section">
                        <Route exect path='/films' component={FilmsPage}/>
                        <Route path='/login' component={Login}/>
                    </section>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;