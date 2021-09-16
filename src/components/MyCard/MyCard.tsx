import React, {ChangeEvent, useEffect, useReducer} from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    TextField,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ICardsDataDTO from "../../models/ICardsDataDTO";
import {myCardAction} from "../../models/enumsActions/myCardAction";

interface ICardProps {
    headerText: string;
    bodyText: string;
    id: string;
    setCards?: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
    isEdit: boolean;
    isSave: boolean;
}

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "250px",
        width: "100%",
        margin: "1rem",
        cursor: "pointer",
    },
    cardBtn: {
        display: "flex",
        justifyContent: "flex-end",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        color: "#3f51b5",
        cursor: "pointer",
        margin: ".3rem",
    },
    input: {
        margin: ".3rem",
    },
    errorText: {
        color: "red",
        fontWeight: "bold",
    },
    bodyText: {
        fontSize: "16px",
        fontWeight: "normal",
    },
});

interface ICardState {
    title?: string;
    body?: string;
    prevTitle?: string;
    prevBody?: string;
    isErrorTitle?: boolean;
    isErrorBody?: boolean;
}

const cardReducer = (
    state: ICardState,
    action: { type: string; payload: ICardState }
): ICardState => {
    switch (action.type) {
        case myCardAction.TITLE_CHANGE: {
            const newState = {...state};
            newState.title = action.payload.title;
            newState.isErrorTitle = action.payload.isErrorTitle;
            return newState;
        }
        case myCardAction.BODY_CHANGE: {
            const newState = {...state};
            newState.body = action.payload.body;
            newState.isErrorBody = action.payload.isErrorBody;
            return newState;
        }
        case myCardAction.PREV_TITLE_CHANGE: {
            const newState = {...state};
            newState.prevTitle = action.payload.prevTitle;
            newState.title = action.payload.prevTitle;
            return newState;
        }
        case myCardAction.PREV_BODY_CHANGE: {
            const newState = {...state};
            newState.prevBody = action.payload.prevBody;
            newState.body = action.payload.prevBody;
            return newState;
        }
        default:
            return state;
    }
};

const MyCard = ({
                    headerText = "title",
                    bodyText = "body",
                    id = "0",
                    setCards,
                    isEdit,
                    isSave,
                }: ICardProps) => {

    const defaultValue = {
        title: headerText,
        body: bodyText,
        prevTitle: headerText,
        prevBody: bodyText,
        isErrorTitle: false,
        isErrorBody: false,
    };

    const classes = useStyles();
    const [cardState, cardDispatch] = useReducer(cardReducer, defaultValue);

    useEffect(() => {
        const check = () => {
            if (isSave) {
                cardDispatch({
                    type: myCardAction.PREV_TITLE_CHANGE,
                    payload: {prevTitle: cardState.title},
                });
                cardDispatch({
                    type: myCardAction.PREV_BODY_CHANGE,
                    payload: {prevBody: cardState.body},
                });
            } else {
                cardDispatch({
                    type: myCardAction.TITLE_CHANGE,
                    payload: {title: cardState.prevTitle},
                });
                cardDispatch({
                    type: myCardAction.BODY_CHANGE,
                    payload: {body: cardState.prevBody},
                });
            }
        };
        check();
    }, [isEdit]);

    const handleDeleteBtnClick = (id: string) => {
        if (setCards) {
            setCards((prevState) => {
                return prevState.filter((item) => item.id !== id);
            });
        }
    };

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        cardDispatch({
            type: myCardAction.TITLE_CHANGE,
            payload: {
                isErrorTitle: e.target.value.trim().length === 0,
                title: e.target.value,
            },
        });
    };
    const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
        cardDispatch({
            type: myCardAction.BODY_CHANGE,
            payload: {
                isErrorBody: e.target.value.trim().length === 0,
                body: e.target.value,
            },
        });
    };

    return (
        <Card className={classes.card}>
            {isEdit && setCards && (
                <button
                    className={classes.cardBtn}
                    onClick={() => {
                        handleDeleteBtnClick(id);
                    }}
                >
                    <span className="material-icons">clear</span>
                </button>
            )}
            <CardActionArea>
                <CardContent>
                    {isEdit ? (
                        <div>
                            <TextField
                                required
                                id="title"
                                label="Title text"
                                className={classes.input}
                                value={cardState.title!}
                                onChange={handleTitle}
                            />{" "}{cardState.isErrorTitle && (
                            <p className={classes.errorText}>This field can't be empty!</p>
                        )}
                        </div>
                    ) : (
                        <Typography variant="h5" color="primary" gutterBottom>
                            {cardState.title!}
                        </Typography>
                    )}

                    {isEdit ? (
                        <div>
                            <TextField
                                required
                                id="body"
                                label="Body text"
                                className={classes.input}
                                value={cardState.body!}
                                onChange={handleBody}
                            />{" "}
                            {cardState.isErrorBody && (
                                <p className={classes.errorText}>This field can't be empty!</p>
                            )}
                        </div>
                    ) : (
                        <Typography
                            variant="h6"
                            color="primary"
                            className={classes.bodyText}
                            gutterBottom
                        >
                            {cardState.body!}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default MyCard;
