import React, {ChangeEvent, useState} from 'react';
import {Button, Card, CardActionArea, CardContent, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface ICardProps {
    headerText: string;
    bodyText: string;
    cards: Array<{ title: string, body: string }>;
    index: number;
    setCards: React.Dispatch<React.SetStateAction<Array<ICardsDataDTO>>>;
    cardHeaderText: string;
    setCardHeaderText: React.Dispatch<React.SetStateAction<string>>;
    cardBodyText: string;
    setCardBodyText: React.Dispatch<React.SetStateAction<string>>;
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
        margin: ".3rem"
    },
    saveBtn: {
        width: "30%",
        cursor: "pointer",
        margin: ".3rem"
    },
    input: {
        margin: ".3rem",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
    }
});

const MyCard = ({
                    headerText,
                    bodyText,
                    cards,
                    index,
                    setCards,
                    cardBodyText,
                    cardHeaderText,
                    setCardBodyText,
                    setCardHeaderText
                }: ICardProps) => {

    const classes = useStyles();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [title, setHeaderText] = useState<string>(headerText)
    const [body, setBodyText] = useState<string>(bodyText)


    const handleDeleteBtnClick = (index: number) => {
        console.log(index)
        setCards((prevState => {
            return prevState.filter((item, i) => i !== index);
        }))
        console.log(cards)
    }

    const handleSaveClick = () => {
        setHeaderText(cardHeaderText);
        setBodyText(cardBodyText)
        setCardHeaderText("")
        setCardBodyText("")
        setIsEdit(false)
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setCardHeaderText(e.target.value);
    }
    const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
        setCardBodyText(e.target.value);
    }

    return (
        <Card className={classes.card}>
            <button className={classes.cardBtn} onClick={() => {
                handleDeleteBtnClick(index)
            }}>
                    <span className="material-icons">
                        clear
                    </span>
            </button>
            <CardActionArea>
                <CardContent>
                    {isEdit ? <TextField required id="title"
                                         label="Title text"
                                         className={classes.input}
                                         value={cardHeaderText}
                                         onChange={handleTitle}/>
                        : <Typography variant="h5" color="primary" gutterBottom>
                            {title}
                        </Typography>}
                    {isEdit ? <TextField required id="title"
                                         label="Title text"
                                         className={classes.input}
                                         value={cardBodyText}
                                         onChange={handleBody}/>
                        : <Typography variant="body1" color="primary" gutterBottom>
                            {body}
                        </Typography>}
                </CardContent>
            </CardActionArea>
            <footer className={classes.footer}>
                {isEdit ?
                    <Button variant="contained" color="primary" className={classes.saveBtn} onClick={handleSaveClick}>
                        Save!
                    </Button>
                    : <button className={classes.cardBtn} onClick={() => {
                        setIsEdit(true)
                    }}>
                    <span className="material-icons">
                        edit
                    </span>
                    </button>
                }
            </footer>
        </Card>
    );
};

export default MyCard;
