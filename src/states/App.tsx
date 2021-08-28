import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import MyModal from "./MyModal/MyModal";

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    addCardBtn: {
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center"
    }
});

const App = () => {
    const [cardHeaderText, setCardHeaderText] = useState<string>('Header')
    const [cardBodyText, setCardBodyText] = useState<string>('Body')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const classes = useStyles();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClick = () => {
        setIsOpen(true)
        console.log('click')
    }


    return (
        <div>
            <Header/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.addCardBtn}>
                Add card
            </Button>
            <Container fixed className={classes.cardContainer}>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
            </Container>
            <MyModal isOpen={isOpen} handleClose={handleClose}/>
        </div>
    );
};

export default App;
