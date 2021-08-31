import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import ICardsDataDTO from "../models/ICardsDataDTO";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const LIMIT_POSTS = 10;
let maxPages = 0;

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
    },
    navigateBtn: {
        margin: "1rem",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
    }
});

const App = () => {
    const [cardHeaderText, setCardHeaderText] = useState<string>('')
    const [cardBodyText, setCardBodyText] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cards, setCards] = useState<ICardsDataDTO[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const classes = useStyles();

    async function fetchData() {
        let data: ICardsDataDTO[] = [];
        const response = await fetch(`${API_URL}?_page=${pageNumber}&_limit=${LIMIT_POSTS}`)
        await response.json().then(res => {
            data = res
        })
        console.log(data)
        setCards(data)
    }

    async function fetchAllData() {
        const response = await fetch(`${API_URL}`)
        if (pageNumber === 1) {
            await response.json().then(res => maxPages = res.length / LIMIT_POSTS)
        }
    }

    useEffect(() => {
        fetchAllData()
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    }, [pageNumber])

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClick = () => {
        handleOpen()
    }
    const prevHandleClick = () => {
        setPageNumber(pageNumber - 1)
    }
    const nextHandleClick = () => {
        setPageNumber(pageNumber + 1)
    }


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.addCardBtn}>
                Add card
            </Button>
            <Container maxWidth="lg" className={classes.cardContainer}>
                <main className={classes.main}>
                    {cards.map(({title, body, id}) => {
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
                <footer>
                    <button className={classes.navigateBtn} onClick={prevHandleClick}>
                        <NavigateBeforeIcon/>
                    </button>
                    <button className={classes.navigateBtn} onClick={nextHandleClick}>
                        <NavigateNextIcon/>
                    </button>
                    <Typography component="span" color="primary">
                        Current page {pageNumber} Max page {maxPages}
                    </Typography>
                </footer>
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={handleClose}
                cardHeaderText={cardHeaderText}
                setCardHeaderText={setCardHeaderText}
                cardBodyText={cardBodyText}
                setCardBodyText={setCardBodyText}
                cards={cards}/>
        </div>
    );
};

export default App;
