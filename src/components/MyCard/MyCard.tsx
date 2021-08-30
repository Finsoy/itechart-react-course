import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface ICardProps {
    headerText: string;
    bodyText: string;
}

const useStyles = makeStyles({
    card: {
    maxWidth: "250px",
    width: "100%",
    margin: "1rem",
    cursor: "pointer",
    }
});

const MyCard = ({headerText, bodyText}: ICardProps) => {
    const classes = useStyles();

    return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {headerText}
                        </Typography>
                        <Typography variant="body1" color="primary" gutterBottom>
                            {bodyText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
    );
};

export default MyCard;
