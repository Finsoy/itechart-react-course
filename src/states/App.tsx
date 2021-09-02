import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import arrayCards from '../data/arrayCards.json'
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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cards, setCards] = useState<ICardsDataDTO[]>(arrayCards)
    const [globalIsEdit, setGlobalIsEdit] = useState<boolean>(false)

    const classes = useStyles();


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={() => {
                setIsOpen(true)
            }} className={classes.addCardBtn}>
                Add card
            </Button>
            {globalIsEdit ? <Button variant="contained" color="secondary" onClick={() => {
                    setGlobalIsEdit(!globalIsEdit)
                }} className={classes.addCardBtn}>
                    Cancel edit all cards
                </Button>
                : <Button variant="contained" color="primary" onClick={() => {
                    setGlobalIsEdit(!globalIsEdit)
                }} className={classes.addCardBtn}>
                    Edit all cards
                </Button>}
            <Container maxWidth="lg" className={classes.cardContainer}>
                {cards.map(({title, body, id}) => {
                    return <MyCard
                        headerText={title}
                        bodyText={body}
                        id={id}
                        setCards={setCards}
                        key={id}
                        globalIsEdit={globalIsEdit}
                    />
                })}
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false)
                }}
                cards={cards}/>
        </div>
    );
};

export default App;
