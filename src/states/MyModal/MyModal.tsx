import React, {FormEvent, FormEventHandler} from 'react';
import {Button, Modal, TextField} from "@material-ui/core";
import './MyModal.scss'

interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const MyModal = ({isOpen, handleClose}: IModalProps) => {
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <form className="form" onSubmit={submitHandler}>
                <TextField required id="title" label="Title text" className="input"/>
                <TextField required id="body" label="Body text" className="input"/>
                <Button variant="contained" color="primary" type="submit" className="submitBtn">
                    Save!
                </Button>
            </form>
        </Modal>
    );
};

export default MyModal;
