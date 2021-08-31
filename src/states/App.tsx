import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import ICardsDataDTO from "../models/ICardsDataDTO";
import LinearProgress from '@material-ui/core/LinearProgress';
import Pagination from "../components/Pagination/Pagination";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const cardsPerPage = 8;
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
    const [cardHeaderText, setCardHeaderText] = useState<string>('')
    const [cardBodyText, setCardBodyText] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cards, setCards] = useState<ICardsDataDTO[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [maxPages, setMaxPages] = useState<number>(0)
    const classes = useStyles();

    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard)

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
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={() => setIsOpen(true)} className={classes.addCardBtn}>
                Add card
            </Button>
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
                            cardHeaderText={cardHeaderText}
                            setCardHeaderText={setCardHeaderText}
                            cardBodyText={cardBodyText}
                            setCardBodyText={setCardBodyText}
                            key={id}
                        />
                    })}
                </main>
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                cardHeaderText={cardHeaderText}
                setCardHeaderText={setCardHeaderText}
                cardBodyText={cardBodyText}
                setCardBodyText={setCardBodyText}
                cards={cards}
                setCards={setCards}
            />
        </div>
    );
};

export default App;
