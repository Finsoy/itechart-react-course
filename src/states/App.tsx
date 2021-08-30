import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import arrayCards from '../data/arrayCards.json'
import ICardsDataDTO from "../models/ICardsDataDTO";

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

const App = () => {
    const classes = useStyles();
    const [cards] = useState<Array<ICardsDataDTO>>(arrayCards)

    return (
        <div>
            <Header/>
            <Container fixed className={classes.cardContainer}>
                {cards.map(({title, body, id}) => {
                    return <MyCard headerText={title} bodyText={body} key={id}/>
                })}
            </Container>
        </div>
    );
};

export default App;
