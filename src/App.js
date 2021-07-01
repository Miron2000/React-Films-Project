import React, {useEffect, useState} from 'react';
import Header from "./components/Common/Header";
import FilmsPage from "./containers/FilmsPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import FilmAdd from "./containers/FilmAdd";
import Footer from "./components/Common/Footer";
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Tooggle from "./components/Common/Tooggle";
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode as setDarkModeAction} from "./store/actions/actions";
import {Theme, User} from "./store/reducers/reducers";
import FilmById from "./components/Table/FilmById";
import ChatButton from "./components/Common/Chat/ChatButton";
import FilmsPageCards from "./containers/FilmsPageCards";

const App = () => {
    const isDarkMode = useSelector((state) => state.Theme.darkTheme);

    const dispatch = useDispatch();
    const setDarkMode = (theme) => {
        dispatch(setDarkModeAction(theme))
    }

    const user = useSelector((state) => state.User.user);
    const isAuthUser = user.userId && user.userId !== null;

    return (
        <BrowserRouter>
            <div className={isDarkMode ? "dark-mode" : "light-mode"}>
                <div className="page">
                    <Header user={user}/>
                    {isAuthUser ? (<div className='common'>
                            <ChatButton user={user}/>
                            <Tooggle setDarkMode={setDarkMode} isDarkMode={isDarkMode}/>
                        </div>) :
                        <h4 className='text__noAuthUser'>Please log in to the site so that you can get detailed information about the films</h4>}
                    <section className="section">
                        <Switch>
                            <Route exact path='/' component={FilmsPageCards}/>
                            <Route exact path='/addFilm' component={FilmAdd}/>
                            <Route path='/films' component={FilmsPage}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Register}/>
                        </Switch>
                    </section>
                    <Route path='/film/:id' component={FilmById}/>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;