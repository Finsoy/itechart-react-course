import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface IEditButtonProps {
    isEdit: boolean;
    setIsSave: () => void;
    setIsEdit: () => void;
    setIsCancel: () => void;
}

const useStyles = makeStyles({
    addCardBtn: {
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center",
    },
});

const EditButton = ({isEdit, setIsSave, setIsEdit, setIsCancel}: IEditButtonProps) => {
    const classes = useStyles();
    return (
        <div>
            {isEdit ? (
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={setIsEdit}
                        className={classes.addCardBtn}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={setIsSave}
                        className={classes.addCardBtn}
                    >
                        Save
                    </Button>
                </div>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={setIsCancel}
                    className={classes.addCardBtn}
                >
                    Edit all cards
                </Button>
            )}
        </div>
    );
};

export default EditButton;
