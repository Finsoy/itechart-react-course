import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

const App = () => {
    const [cardHeaderText, setCardHeaderText] = useState<string>('Header')
    const [cardBodyText, setCardBodyText] = useState<string>('Body')
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <Container fixed className={classes.cardContainer}>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
                <MyCard headerText={cardHeaderText} bodyText={cardBodyText}/>
            </Container>
        </div>
    );
};

export default App;
