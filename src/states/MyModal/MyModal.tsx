import React, {ChangeEvent, FormEvent} from 'react';
import {Button, Modal, TextField} from "@material-ui/core";
import './MyModal.scss'

interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
    cardHeaderText: string;
    setCardHeaderText: React.Dispatch<React.SetStateAction<string>>;
    cardBodyText: string;
    setCardBodyText: React.Dispatch<React.SetStateAction<string>>;
    cards: Array<{ title: string, body: string }>;
}

const MyModal = ({
                     isOpen,
                     handleClose,
                     cardHeaderText,
                     setCardHeaderText,
                     cardBodyText,
                     setCardBodyText,
                     cards
                 }: IModalProps) => {
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        cards.push({
            title: cardHeaderText,
            body: cardBodyText
        })
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

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <form className="form" onSubmit={submitHandler}>
                <TextField required id="title" label="Title text" className="input" value={cardHeaderText}
                           onChange={handleTitle}/>
                <TextField required id="body" label="Body text" className="input" value={cardBodyText}
                           onChange={handleBody}/>
                <Button variant="contained" color="primary" type="submit" className="submitBtn">
                    Save!
                </Button>
            </form>
        </Modal>
    );
};

export default MyModal;
