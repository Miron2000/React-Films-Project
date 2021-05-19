import React from 'react';
import Header from "./components/Common/Header";
import FilmsPage from "./containers/FilmsPage";
import Login from "./containers/Login";
import Footer from "./components/Common/Footer";
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Header/>
                <section className="section">
                    <Route exect path='/films' component={FilmsPage}/>
                    <Route path='/login' component={Login}/>
                </section>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;