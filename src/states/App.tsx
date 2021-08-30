import React from 'react';
import { v4 } from 'uuid';
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import arrayCards from '../data/arrayCards.json'
import ICardsDataDTO from "../data/ICardsDataDTO";

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <Container fixed className={classes.cardContainer}>
                {arrayCards.map(({title, body, id}: ICardsDataDTO) => {
                    id = v4()
                    return <MyCard headerText={title} bodyText={body} key={id}/>
                })}
            </Container>
        </div>
    );
};

export default App;
