import React, {useState} from 'react';
import {Button, Container} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "../../Pagination/Pagination";
import MyCard from "../../MyCard/MyCard";
import MyModal from "../../../states/MyModal/MyModal";
import {makeStyles} from "@material-ui/core/styles";
import IMainProps from "../../../models/IMainProps";

const cardsPerPage = 8;

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

const CardsList = ({isLoading, cards, setCards, maxPages}: IMainProps) => {
    const classes = useStyles();
    const [cardHeaderText, setCardHeaderText] = useState<string>('')
    const [cardBodyText, setCardBodyText] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1)

    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard)

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}
                    className={classes.addCardBtn}>
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

export default CardsList;
