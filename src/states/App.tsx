import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import ICardsDataDTO from "../models/ICardsDataDTO";

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap"
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
    const classes = useStyles();

    async function fetchData() {
        let data: ICardsDataDTO[] = [];
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=2')
        await response.json().then(res => data = res)
        console.log(data)
        setCards(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClick = () => {
        handleOpen()
    }


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.addCardBtn}>
                Add card
            </Button>
            <Container maxWidth="lg" className={classes.cardContainer}>
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
