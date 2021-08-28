import React from 'react';
import './MyCard.scss';
import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";

interface ICardProps {
    headerText: string;
    bodyText: string;
}

const MyCard = ({headerText, bodyText}: ICardProps) => {
    return (
        <Card className="card">
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
