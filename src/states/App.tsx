import React from 'react';
import './App.scss';
import Header from "../components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Main from "../components/Main/Main";


const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Main/>
        </BrowserRouter>
    );
};

export default App;
