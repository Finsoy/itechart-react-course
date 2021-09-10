import React from 'react';
import {NavLink} from 'react-router-dom'
import {AppBar, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    link: {
        display: "flex",
        height: "64px",
        fontSize: "26px",
        color: "#fff",
        textDecoration: "none",
        alignItems: "center",
        padding: "0 .5rem",
        "&:hover": {
            backgroundColor: "#5c6cc8"
        },
    },
    active: {
        backgroundColor: "#5c6cc8"
    }
});

const Header = () => {
    const classes = useStyles();

    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <NavLink className={classes.link} activeClassName={classes.active} exact to='/main'>Home</NavLink>
                    <NavLink className={classes.link} activeClassName={classes.active} exact to='/cards'>Cards</NavLink>
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default Header;
