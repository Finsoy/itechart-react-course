import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import ICardsDataDTO from "../models/ICardsDataDTO";
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from "../components/Pagination/Pagination";
import EditButton from "../components/EditButton/EditButton";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const CARDS_PER_PAGE = 8;
const LIMIT_CARDS = 10;

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column"
    },
    main: {
        display: "flex",
        flexWrap: "wrap",
    },
    addCardBtn: {
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center"
    }
});

const App = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cards, setCards] = useState<ICardsDataDTO[]>([])
    const [isSave, setIsSave] = useState<boolean>(false);
    const [globalIsEdit, setGlobalIsEdit] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [maxPages, setMaxPages] = useState<number>(0)
    const classes = useStyles();

    const indexOfLastCard = pageNumber * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard)

    async function fetchAllData() {
        setIsLoading(true)
        const response = await fetch(`${API_URL}?_limit=${LIMIT_CARDS}`)
        const allCards: ICardsDataDTO[] = await response.json();
        setMaxPages(Math.ceil(allCards.length / CARDS_PER_PAGE));
        setCards(allCards)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAllData();
    }, [])

    useEffect(() => {
        setMaxPages(Math.ceil(cards.length / CARDS_PER_PAGE));
    }, [cards])


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={() => setIsOpen(true)} className={classes.addCardBtn}>
                Add card
            </Button>
            <EditButton globalIsEdit={globalIsEdit} setIsSave={setIsSave} setGlobalIsEdit={setGlobalIsEdit}/>
            <Container maxWidth="lg" className={classes.cardContainer}>
                {isLoading && <LinearProgress/>}
                <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} maxPages={maxPages}/>
                <main className={classes.main}>
                    {currentArrayCards.map(({title, body, id}) => {
                        return <MyCard
                            headerText={title}
                            bodyText={body}
                            id={id}
                            setCards={setCards}
                            globalIsEdit={globalIsEdit}
                            key={id}
                            isSave={isSave}
                        />
                    })}
                </main>
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                cards={cards}
                setCards={setCards}/>
        </div>
    );
};

export default App;
