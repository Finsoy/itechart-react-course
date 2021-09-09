import React from 'react';
import {NavLink} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    mainLink: {
        display: "flex",
        justifyContent: "center",
        fontSize: "36px",
        color: "#3f51b5",
        textDecoration: "none",
        margin: "1rem auto",
    },
});


const MainPage = () => {
    const classes = useStyles();

    return (
        <h1>
            <NavLink to="/cards" className={classes.mainLink}>
                Click to see all cards
            </NavLink>
        </h1>

    );
};

export default MainPage;
