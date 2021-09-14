import React, {ChangeEvent, FormEvent, useState} from 'react';
import {v4} from 'uuid';
import {Button, Modal, TextField} from "@material-ui/core";
import ICardsDataDTO from "../../models/ICardsDataDTO";
import {makeStyles} from "@material-ui/core/styles";

interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
    setCards: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
}

const useStyles = makeStyles({
    form: {
        position: "absolute",
        width: "400px",
        border: "2px solid #3f51b5",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        outline: "none",
        color: "white",
        backgroundColor: "white",
        borderRadius: ".7rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        margin: "1rem",
        width: "70%",
    },
    submitBtn: {
        marginBottom: "1rem"
    }
});

const MyModal = ({
                     isOpen,
                     handleClose,
                     setCards
                 }: IModalProps) => {

    const classes = useStyles();
    const [cardHeaderText, setCardHeaderText] = useState<string>('')
    const [cardBodyText, setCardBodyText] = useState<string>('')

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postData();
        setCardHeaderText("")
        setCardBodyText("")
        handleClose();
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setCardHeaderText(e.target.value);
    }
    const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
        setCardBodyText(e.target.value);
    }

    const postData = async () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: cardHeaderText,
                body: cardBodyText,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                console.log(`STATUS ${response.status}`)
                return response.json()
            })
            .then(async (json) => {
                json.id = v4();
                await setCards(prevState => [...prevState, json])
            }).catch(e => console.error(e))
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <form className={classes.form} onSubmit={submitHandler}>
                <TextField required id="title" label="Title text" className={classes.input} value={cardHeaderText}
                           onChange={handleTitle}/>
                <TextField required id="body" label="Body text" className={classes.input} value={cardBodyText}
                           onChange={handleBody}/>
                <Button variant="contained" color="primary" type="submit" className={classes.submitBtn}>
                    Save!
                </Button>
            </form>
        </Modal>
    );
};

export default MyModal;
