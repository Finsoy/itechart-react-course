import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    tabLink: {
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
    },
});


const MyTabs = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <NavLink to="/cards" className={classes.tabLink}>
                        <Tab label="All cards"/>
                    </NavLink>
                    <NavLink to={`/cards/${value}`} className={classes.tabLink}>
                        <Tab label="All cards"/>
                    </NavLink>

                </Tabs>
            </AppBar>
        </div>
    );
};

export default MyTabs;
