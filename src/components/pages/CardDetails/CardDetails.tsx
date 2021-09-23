import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import MyCard from "../../MyCard/MyCard";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyTabs from "../../MyTabs/MyTabs";
import ICardsDataDTO from "../../../models/ICardsDataDTO";
import editAndSaveReducer from "../../../redux/reducers/editAndSaveReducer";
import { editAndSaveActions } from "../../../models/enumsActions/editAndSaveActions";
import initialStateForEditCard from "../../../models/initialStateForEditCard";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    cardId: {
        margin: "1rem",
    },
    btn: {
        margin: ".5rem",
    },
});

const CardDetails = () => {
    const classes = useStyles();
    const params: { id: string } = useParams();
    const localstorageCards = window.localStorage.getItem("arrayOfCards");
    const cards: ICardsDataDTO[] = JSON.parse(localstorageCards!);
    const card = cards!.filter((item) => item.id.toString() === params.id)[0];

    const [editAndSaveState, editAndSaveStateDispatch] = useReducer(
        editAndSaveReducer,
        initialStateForEditCard
    );

    const setIsEdit = () => {
        editAndSaveStateDispatch({ type: editAndSaveActions.SAVE });
    };

    const setIsSave = () => {
        editAndSaveStateDispatch({ type: editAndSaveActions.EDIT });
    };

    return (
        <div>
            <MyTabs tabValue={params.id} />
            <div className={classes.container}>
                <Typography className={classes.cardId} variant="h5" color="primary">
                    Card ID: {params.id}
                </Typography>
                <MyCard
                    headerText={card.title}
                    bodyText={card.body}
                    id={card.id}
                    isEdit={editAndSaveState.isEdit}
                    isSave={editAndSaveState.isSave}
                />
                {editAndSaveState.isEdit && (
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="secondary"
                        onClick={setIsSave}
                    >
                        Cancel
                    </Button>
                )}
                {editAndSaveState.isEdit && (
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        onClick={setIsEdit}
                    >
                        Save
                    </Button>
                )}
                {!editAndSaveState.isEdit && (
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        onClick={setIsSave}
                    >
                        Change
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CardDetails;
