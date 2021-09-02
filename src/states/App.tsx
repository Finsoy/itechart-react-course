import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import arrayCards from '../data/arrayCards.json'
import ICardsDataDTO from "../models/ICardsDataDTO";
import EditButton from "../components/EditButton/EditButton";

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
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(false);
    const [cards, setCards] = useState<ICardsDataDTO[]>(arrayCards)
    const [globalIsEdit, setGlobalIsEdit] = useState<boolean>(false)


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={() => {
                setIsOpen(true)
            }} className={classes.addCardBtn}>
                Add card
            </Button>
            <EditButton globalIsEdit={globalIsEdit} setIsSave={setIsSave} setGlobalIsEdit={setGlobalIsEdit}/>
            <Container maxWidth="lg" className={classes.cardContainer}>
                {cards.map(({title, body, id}) => {
                    return <MyCard
                        headerText={title}
                        bodyText={body}
                        id={id}
                        setCards={setCards}
                        key={id}
                        globalIsEdit={globalIsEdit}
                        isSave={isSave}
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
