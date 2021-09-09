import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    error: {
        display: "flex",
        justifyContent: "center",
        fontSize: "36px",
        color: "#f44336",
        textDecoration: "none",
        margin: "1rem auto",
    },
});

const ErrorPage = () => {
    const classes = useStyles();

    return (
        <h1 className={classes.error}>
          Error 404 page was not found
        </h1>
    );
};

export default ErrorPage;
