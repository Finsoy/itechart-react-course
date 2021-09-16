import React, { useContext, useEffect, useState, useReducer } from "react";
import { Button, Container } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "../../Pagination/Pagination";
import MyCard from "../../MyCard/MyCard";
import MyModal from "../../../states/MyModal/MyModal";
import { makeStyles } from "@material-ui/core/styles";
import EditButton from "../../EditButton/EditButton";
import ICardsDataDTO from "../../../models/ICardsDataDTO";
import MyTabs from "../../MyTabs/MyTabs";
import CardsContext from "../../../store/cards-context";
import { editAndSaveActions } from "../../../models/enumsActions/editAndSaveActions";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const cardsPerPage = 8;
const LIMIT_CARDS = 10;

const useStyles = makeStyles({
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    main: {
        display: "flex",
        flexWrap: "wrap",
    },
    addCardBtn: {
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center",
    },
});

const initialState = {
    isEdit: false,
    isSave: false,
};

interface IIsEditAndIsSaveState {
    isEdit: boolean;
    isSave: boolean;
}

const editAndSaveReducer = (state: IIsEditAndIsSaveState = initialState, action: { type: string }) => {
    switch (action.type) {
        case editAndSaveActions.EDIT: {
            return {
                isEdit: !state.isEdit,
                isSave: false,
            };
        }
        case editAndSaveActions.SAVE: {
            return {
                isEdit: !state.isEdit,
                isSave: true,
            };
        }
        case editAndSaveActions.CANCEL: {
            return {
                ...state,
                isEdit: !state.isEdit,
            };
        }
    }
    return state;
};

const CardsList = () => {
    const classes = useStyles();
    const ctx = useContext(CardsContext);
    const { cards, setCards } = ctx;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [editAndSaveState, editAndSaveStateDispatch] = useReducer(
        editAndSaveReducer,
        initialState
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [maxPages, setMaxPages] = useState<number>(0);

    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const setIsEdit = (): void => {
        editAndSaveStateDispatch({ type: editAndSaveActions.EDIT });
    };
    const setIsSave = (): void => {
        editAndSaveStateDispatch({ type: editAndSaveActions.SAVE });
    };
    const setIsCancel = (): void => {
        editAndSaveStateDispatch({ type: editAndSaveActions.CANCEL });
    };

    useEffect(() => {
        async function fetchAllData() {
            setIsLoading(true);
            const response = await fetch(`${API_URL}?_limit=${LIMIT_CARDS}`);
            const allCards: ICardsDataDTO[] = await response.json();
            setMaxPages(Math.ceil(allCards.length / cardsPerPage));
            setCards(allCards);
            setIsLoading(false);
        }

        fetchAllData();
    }, [setCards]);

    useEffect(() => {
        setMaxPages(Math.ceil(cards.length / cardsPerPage));
        window.localStorage.setItem("arrayOfCards", JSON.stringify(cards));
    }, [cards]);

    return (
        <div>
            <MyTabs cards={cards} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(true)}
                className={classes.addCardBtn}
            >
                Add card
            </Button>
            <EditButton
                isEdit={editAndSaveState.isEdit}
                setIsSave={setIsSave}
                setIsEdit={setIsEdit}
                setIsCancel={setIsCancel}
            />
            <Container maxWidth="lg" className={classes.cardContainer}>
                {isLoading && <LinearProgress />}
                <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    maxPages={maxPages}
                />
                <main className={classes.main}>
                    {currentArrayCards.map(({ title, body, id }) => {
                        return (
                            <MyCard
                                headerText={title}
                                bodyText={body}
                                id={id}
                                setCards={setCards}
                                isEdit={editAndSaveState.isEdit}
                                key={id}
                                isSave={editAndSaveState.isSave}
                            />
                        );
                    })}
                </main>
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                setCards={setCards}
            />
        </div>
    );
};

export default CardsList;
