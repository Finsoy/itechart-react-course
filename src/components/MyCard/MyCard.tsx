import React, {ChangeEvent, useEffect, useState} from 'react';
import {Card, CardActionArea, CardContent, TextField, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface ICardProps {
    headerText: string;
    bodyText: string;
    id: string;
    setCards: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
    globalIsEdit: boolean;
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
        margin: ".3rem"
    },
    input: {
        margin: ".3rem",
    },
    errorText: {
        color: "red",
        fontWeight: "bold"
    }
});

const MyCard = ({
                    headerText,
                    bodyText,
                    id,
                    setCards,
                    globalIsEdit,
                    isSave,
                }: ICardProps) => {

        const classes = useStyles();
        const [title, setTitle] = useState<string>(headerText)
        const [body, setBody] = useState<string>(bodyText)
        const [prevHeaderText, setPrevHeaderText] = useState<string>(headerText)
        const [prevBodyText, setPrevBodyText] = useState<string>(bodyText)
        const [isError, setIsError] = useState<boolean>(false)

        useEffect(() => {
            const check = () => {
                if (isSave) {
                    setPrevHeaderText(title)
                    setPrevBodyText(body)
                } else {
                    setTitle(prevHeaderText);
                    setBody(prevBodyText);
                }
            }
            check()
        }, [isSave])

        const handleDeleteBtnClick = (id: string) => {
            setCards((prevState => {
                return prevState.filter((item) => item.id !== id);
            }))
        }

        const validate = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.trim().length === 0) {
                setIsError(true)
            } else {
                setIsError(false)
            }
        }


        const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
            validate(e)
            setTitle(e.target.value);
        }
        const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
            validate(e)
            setBody(e.target.value);
        }

        return (
            <Card className={classes.card}>
                {globalIsEdit && <button className={classes.cardBtn} onClick={() => {
                    handleDeleteBtnClick(id)
                }}>
                    <span className="material-icons">
                        clear
                    </span>
                </button>}
                <CardActionArea>
                    <CardContent>
                        {globalIsEdit ? <div><TextField required id="title"
                                                        label="Title text"
                                                        className={classes.input}
                                                        value={title}
                                                        onChange={handleTitle}/> {isError && <p
                                className={classes.errorText}>This field can't be
                                empty!</p>}</div>
                            : <Typography variant="h5" color="primary" gutterBottom>
                                {title}
                            </Typography>}

                        {globalIsEdit ? (<div><TextField required id="body"
                                                         label="Body text"
                                                         className={classes.input}
                                                         value={body}
                                                         onChange={handleBody}/> {isError && <p
                                className={classes.errorText}>This field can't be
                                empty!</p>}</div>)
                            : <Typography variant="h5" color="primary" gutterBottom>
                                {body}
                            </Typography>}
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
;

export default MyCard;
