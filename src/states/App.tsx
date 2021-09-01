import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "../components/Header/Header";
import ICardsDataDTO from "../models/ICardsDataDTO";
import {BrowserRouter} from "react-router-dom";
import Main from "../components/Main/Main";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const cardsPerPage = 8;
const LIMIT_CARDS = 10;


const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cards, setCards] = useState<ICardsDataDTO[]>([])
    const [maxPages, setMaxPages] = useState<number>(0)

    async function fetchAllData() {
        setIsLoading(true)
        const response = await fetch(`${API_URL}?_limit=${LIMIT_CARDS}`)
        const allCards: ICardsDataDTO[] = await response.json();
        setMaxPages(Math.ceil(allCards.length / cardsPerPage));
        setCards(allCards)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAllData();
    }, [])

    useEffect(() => {
        setMaxPages(Math.ceil(cards.length / cardsPerPage));
    }, [cards])


    return (
        <BrowserRouter>
            <Header/>
            <Main isLoading={isLoading}
                  cards={cards}
                  setCards={setCards}
                  maxPages={maxPages}/>
        </BrowserRouter>
    );
};

export default App;
