import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import MyCard from "../../MyCard/MyCard";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyTabs from "../../MyTabs/MyTabs";
import ICardsDataDTO from "../../../models/ICardsDataDTO";


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    cardId: {
        margin: "1rem"
    },
    btn: {
        margin: ".5rem"
    }
});


const CardDetails = () => {
    const classes = useStyles();
    const params: { id: string } = useParams();
    const localstorageCards = window.localStorage.getItem('arrayOfCards');
    const cards: ICardsDataDTO[] = JSON.parse(localstorageCards!)
    const card = cards!.filter(item => item.id.toString() === params.id)[0]
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
        <div>
            <MyTabs cards={cards} tabValue={params.id}/>
            <div className={classes.container}>
                <Typography className={classes.cardId} variant="h5" color="primary">
                    Card ID: {params.id}
                </Typography>
                <MyCard headerText={card.title} bodyText={card.body} id={card.id} globalIsEdit={isEdit}
                        isSave={isSave}/>
                {isEdit &&
                <Button className={classes.btn} variant="contained" color="secondary" onClick={handleCancelClick}
                >
                    Cancel
                </Button>}
                {isEdit &&
                <Button className={classes.btn} variant="contained" color="primary" onClick={handleSaveClick}
                >
                    Save
                </Button>}
                {!isEdit &&
                <Button className={classes.btn} variant="contained" color="primary" onClick={() => setIsEdit(true)}
                >
                    Change
                </Button>}
            </div>
        </div>

    )
}


export default CardDetails;
