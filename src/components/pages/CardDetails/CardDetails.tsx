import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import CardsContext from "../../../store/cards-context";
import MyCard from "../../MyCard/MyCard";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyTabs from "../../MyTabs/MyTabs";


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    cardId: {
        margin: "1rem"
    }
});


const CardDetails = () => {
    const classes = useStyles();
    const params: { id: string } = useParams();
    const ctx = useContext(CardsContext)
    const {cards} = ctx;
    let card = cards.filter(item => item.id.toString() === params.id)
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(false);

    const handleSaveClick = () => {
        setIsSave(true)
        setIsEdit(false)
    }

    const handleCancelClick = () => {
        setIsSave(false)
        setIsEdit(false)
    }

    return (
        <>
            <MyTabs cards={cards} tabValue={params.id}/>
            <div className={classes.container}>
                <Typography className={classes.cardId} variant="h5" color="primary">
                    Card ID: {params.id}
                </Typography>
                <MyCard headerText={card[0].title} bodyText={card[0].body} id={card[0].id} globalIsEdit={isEdit}
                        isSave={isSave}/>
                {isEdit && <Button variant="contained" color="primary" onClick={handleSaveClick}
                >
                    Save
                </Button>}
                {isEdit && <Button variant="contained" color="secondary" onClick={handleCancelClick}
                >
                    Cancel
                </Button>}
                {!isEdit && <Button variant="contained" color="primary" onClick={() => setIsEdit(true)}
                >
                    Change
                </Button>}
            </div>
        </>
    );
};

export default CardDetails;
