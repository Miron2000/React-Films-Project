import React, {useEffect, useState} from 'react';
import Header from "./components/Common/Header";
import FilmsPage from "./containers/FilmsPage";
import Login from "./containers/Login";
import Footer from "./components/Common/Footer";
import './index.css';
import {BrowserRouter, Route} from "react-router-dom";
import Tooggle from "./components/Common/Tooggle";
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "./store/actions/actions";
import {Theme} from "./store/reducers/reducers";

const App = () => {
    const darkMode = useSelector((state) => state.Theme.darkTheme);

    const dispatch = useDispatch();
    const setDarkModePage = (theme) => {
        dispatch(setDarkMode(theme))
    }


    return (
        <BrowserRouter>
            <div className={darkMode ? "dark-mode" : "light-mode"}>
                <div className="page">
                    <Header/>
                    <Tooggle setDarkModePage={setDarkModePage} darkMode={darkMode}/>
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