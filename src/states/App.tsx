import React, {useState} from 'react';
import './App.scss';
import Header from "../components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Main from "../components/Main/Main";
import CardsContext from "../store/cards-context";
import ICardsDataDTO from "../models/ICardsDataDTO";


const App = () => {
    const [cards, setCards] = useState<ICardsDataDTO[]>([])

    return (
        <CardsContext.Provider value={{cards, setCards}}>
            <BrowserRouter>
                <Header/>
                <Main/>
            </BrowserRouter>
        </CardsContext.Provider>
    );
};

export default App;
