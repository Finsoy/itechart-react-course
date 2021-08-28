import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import MyCard from "../components/MyCard/MyCard";
import Header from "../components/Header/Header";
import arrayCards from '../data/arrayCards.json'

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
                {arrayCards.map(({title, body}) => {
                    return <MyCard headerText={title} bodyText={body}/>
                })}
            </Container>
        </div>
    );
};

export default App;
