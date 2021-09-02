import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, CardContent, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface ICardProps {
    headerText: string;
    bodyText: string;
    id: string;
    setCards: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
    globalIsEdit: boolean;
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
                    id,
                    setCards,
                    globalIsEdit,
                }: ICardProps) => {

    const classes = useStyles();
    const [title, setTitle] = useState<string>(headerText)
    const [body, setBody] = useState<string>(bodyText)
    const [isEdit, setIsEdit] = useState<boolean>(globalIsEdit)
    const [prevHeaderText, setPrevHeaderText] = useState<string>(headerText)
    const [prevBodyText, setPrevBodyText] = useState<string>(bodyText)

    useEffect(() => {
        if (globalIsEdit !== isEdit) {
            setIsEdit(globalIsEdit)
        }
    }, [globalIsEdit])


    const handleDeleteBtnClick = (id: string) => {
        setCards((prevState => {
            return prevState.filter((item) => item.id !== id);
        }))
    }

    const handleSaveClick = () => {
        setPrevHeaderText(title)
        setPrevBodyText(body)
        setIsEdit(false)
    }

    const handleCancelClick = () => {
        setTitle(prevHeaderText);
        setBody(prevBodyText);
        setIsEdit(false)
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    }

    return (
        <Card className={classes.card}>
            {isEdit && <button className={classes.cardBtn} onClick={() => {
                handleDeleteBtnClick(id)
            }}>
                    <span className="material-icons">
                        clear
                    </span>
            </button>}
            <CardActionArea>
                <CardContent>
                    {isEdit ? <TextField required id="title"
                                         label="Title text"
                                         className={classes.input}
                                         value={title}
                                         onChange={handleTitle}/>
                        : <Typography variant="h5" color="primary" gutterBottom>
                            {title}
                        </Typography>}
                    {isEdit ? <TextField required id="title"
                                         label="Title text"
                                         className={classes.input}
                                         value={body}
                                         onChange={handleBody}/>
                        : <Typography variant="body1" color="primary" gutterBottom>
                            {body}
                        </Typography>}
                </CardContent>
            </CardActionArea>
            <footer className={classes.footer}>
                {isEdit &&
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                    Save
                </Button>}
                {isEdit &&
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                    Cancel
                </Button>}
            </footer>
        </Card>
    );
};

export default MyCard;
