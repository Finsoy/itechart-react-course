import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, Container, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        width: "100%",
        margin: "1rem",
        cursor: "pointer",
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography component="h1" variant="h3" color="primary" align="center">itechart-react-course</Typography>
            <Container fixed className={classes.cardContainer}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" color="primary" gutterBottom>
                                header
                            </Typography>
                            <Typography variant="body1" color="primary" gutterBottom>
                                body
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" color="primary" gutterBottom>
                                header
                            </Typography>
                            <Typography variant="body1" color="primary" gutterBottom>
                                body
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" color="primary" gutterBottom>
                                header
                            </Typography>
                            <Typography variant="body1" color="primary" gutterBottom>
                                body
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        </div>
    );
};

export default App;
