import React from 'react';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface IEditButtonProps {
    globalIsEdit: boolean;
    setIsSave: React.Dispatch<React.SetStateAction<boolean>>;
    setGlobalIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles({
    addCardBtn: {
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center"
    }
});


const EditButton = ({globalIsEdit, setIsSave, setGlobalIsEdit}: IEditButtonProps) => {
    const classes = useStyles();
    return (
        <div>
            {globalIsEdit ? <div><Button variant="contained" color="secondary" onClick={() => {
                    setGlobalIsEdit(!globalIsEdit)
                    setIsSave(false)
                }} className={classes.addCardBtn}>
                    Cancel
                </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        setGlobalIsEdit(!globalIsEdit)
                        setIsSave(true)
                    }} className={classes.addCardBtn}>
                        Save
                    </Button></div>
                : <Button variant="contained" color="primary" onClick={() => {
                    setGlobalIsEdit(!globalIsEdit)
                }} className={classes.addCardBtn}>
                    Edit all cards
                </Button>}
        </div>

    );
};

export default EditButton;
