import React from 'react';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface IPaginationProps {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    maxPages: number;
}

const useStyles = makeStyles({
    navigateBtn: {
        margin: "1rem",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
    }
})

const Pagination = ({pageNumber, setPageNumber, maxPages}: IPaginationProps) => {
    const classes = useStyles();

    const prevHandleClick = () => {
        setPageNumber(pageNumber - 1)
    }
    const nextHandleClick = () => {
        setPageNumber(pageNumber + 1)
    }

    return (
        <div>
            {pageNumber > 1 && <button className={classes.navigateBtn} onClick={prevHandleClick}>
                <NavigateBeforeIcon/>
            </button>}

            {pageNumber < maxPages && <button className={classes.navigateBtn} onClick={nextHandleClick}>
                <NavigateNextIcon/>
            </button>}
            <Typography component="span" color="primary">
                Current page {pageNumber} Max pages {maxPages}
            </Typography>
        </div>
    );
};

export default Pagination;
