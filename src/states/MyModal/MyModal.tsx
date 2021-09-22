import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handleAddBtnClick: (cardHeaderText: string, cardBodyText: string) => void;
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
        marginBottom: "1rem",
    },
});

const MyModal = ({
                     isOpen,
                     handleClose,
                     handleAddBtnClick,
                 }: IModalProps) => {
    const classes = useStyles();
    const [cardHeaderText, setCardHeaderText] = useState<string>("");
    const [cardBodyText, setCardBodyText] = useState<string>("");

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleAddBtnClick(cardHeaderText, cardBodyText);
        setCardHeaderText("");
        setCardBodyText("");
        handleClose();
    };
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setCardHeaderText(e.target.value);
    };
    const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
        setCardBodyText(e.target.value);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <form className={classes.form} onSubmit={submitHandler}>
                <TextField
                    required
                    id="title"
                    label="Title text"
                    className={classes.input}
                    value={cardHeaderText}
                    onChange={handleTitle}
                />
                <TextField
                    required
                    id="body"
                    label="Body text"
                    className={classes.input}
                    value={cardBodyText}
                    onChange={handleBody}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitBtn}
                >
                    Save!
                </Button>
            </form>
        </Modal>
    );
};

export default MyModal;
