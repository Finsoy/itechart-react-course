import React, {useEffect, useState} from 'react';
import {Button, Container} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "../../Pagination/Pagination";
import MyCard from "../../MyCard/MyCard";
import MyModal from "../../../states/MyModal/MyModal";
import {makeStyles} from "@material-ui/core/styles";
import EditButton from "../../EditButton/EditButton";
import ICardsDataDTO from "../../../models/ICardsDataDTO";
import MyTabs from "../../Tabs/Tabs";

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

const CardsList = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [globalIsEdit, setGlobalIsEdit] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cards, setCards] = useState<ICardsDataDTO[]>([])
    const [maxPages, setMaxPages] = useState<number>(0)


    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard)


    useEffect(() => {
        async function fetchAllData() {
            setIsLoading(true)
            const response = await fetch(`${API_URL}?_limit=${LIMIT_CARDS}`)
            const allCards: ICardsDataDTO[] = await response.json();
            setMaxPages(Math.ceil(allCards.length / cardsPerPage));
            setCards(allCards)
            setIsLoading(false)
        }

        fetchAllData();
    }, [])

    useEffect(() => {
        setMaxPages(Math.ceil(cards.length / cardsPerPage));
    }, [cards])


    return (
        <>
            <MyTabs/>
            <div>
                <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}
                        className={classes.addCardBtn}>
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
                                isSave={isSave}/>
                        })}
                    </main>
                </Container>
                <MyModal
                    isOpen={isOpen}
                    handleClose={() => setIsOpen(false)}
                    cards={cards}
                    setCards={setCards}
                />
            </div>
        </>
    );
};

export default CardsList;
