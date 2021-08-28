import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";
import arrayCards from '../data/arrayCards.json'

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
    const classes = useStyles();

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
                {arrayCards.map(({title, body}) => {
                    return <MyCard headerText={title} bodyText={body}/>
                })}
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={handleClose}
                cardHeaderText={cardHeaderText}
                setCardHeaderText={setCardHeaderText}
                cardBodyText={cardBodyText}
                setCardBodyText={setCardBodyText}
                cards={arrayCards}/>
        </div>
    );
};

export default App;
