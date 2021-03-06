import React, {useEffect, useState, useReducer, useCallback} from "react";
import {Button, Container} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "../../Pagination/Pagination";
import MyCard from "../../MyCard/MyCard";
import MyModal from "../../../states/MyModal/MyModal";
import {makeStyles} from "@material-ui/core/styles";
import EditButton from "../../EditButton/EditButton";
import ICardsDataDTO from "../../../models/ICardsDataDTO";
import MyTabs from "../../MyTabs/MyTabs";
import {editAndSaveActions} from "../../../models/enumsActions/editAndSaveActions";
import editAndSaveReducer from "../../../redux/reducers/editAndSaveReducer";
import initialStateForEditCard from "../../../models/initialStateForEditCard";
import addOrRemoveCardReducer, {
    ADD,
    REMOVE,
} from "../../../redux/reducers/addOrRemoveCardReducer";
import {useDispatch, useSelector} from "react-redux";
import ICardsState from "../../../models/ICardsState";
import {fetchAllData} from "../../../redux/asyncFunction/fetchAllData";
import {updateAction} from "../../../redux/reducers/arrayOfCardsReducer";

const cardsPerPage = 8;

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

const CardsList = () => {
    const classes = useStyles();
    const cards = useSelector((state: ICardsState) => state.cards);
    const dispatch = useDispatch();
    const setCards = useCallback(
        (cards: ICardsDataDTO[]) => dispatch(updateAction(cards)),
        [dispatch]
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [editAndSaveState, editAndSaveStateDispatch] = useReducer(
        editAndSaveReducer,
        initialStateForEditCard
    );

    const [, addOrRemoveCardDispatch] = useReducer(addOrRemoveCardReducer, []);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [maxPages, setMaxPages] = useState<number>(0);

    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentArrayCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const handleDeleteBtnClick = (id: string) => {
        addOrRemoveCardDispatch({type: REMOVE, cards, setCards, id});
    };

    const handleAddBtnClick = (cardHeaderText: string, cardBodyText: string) => {
        addOrRemoveCardDispatch({
            type: ADD,
            cards,
            setCards,
            cardHeaderText,
            cardBodyText,
        });
    };

    const setIsEdit = () => {
        editAndSaveStateDispatch({type: editAndSaveActions.EDIT});
    };
    const setIsSave = () => {
        editAndSaveStateDispatch({type: editAndSaveActions.SAVE});
    };

    useEffect(() => {
        const fetchData = async () => {
             setIsLoading(true);
            await dispatch(fetchAllData());
             setIsLoading(false);
        }
        fetchData()
    }, [dispatch]);

    useEffect(() => {
        setMaxPages(Math.ceil(cards.length / cardsPerPage));
        window.localStorage.setItem("arrayOfCards", JSON.stringify(cards));
    }, [cards]);

    return (
        <div>
            <MyTabs/>
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
            />
            <Container maxWidth="lg" className={classes.cardContainer}>
                {isLoading && <LinearProgress/>}
                <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    maxPages={maxPages}
                />
                <main className={classes.main}>
                    {currentArrayCards.map(({title, body, id}) => {
                        return (
                            <MyCard
                                headerText={title}
                                bodyText={body}
                                id={id}
                                setCards={setCards}
                                isEdit={editAndSaveState.isEdit}
                                key={id}
                                isSave={editAndSaveState.isSave}
                                handleDeleteBtnClick={handleDeleteBtnClick}
                            />
                        );
                    })}
                </main>
            </Container>
            <MyModal
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)} handleAddBtnClick={handleAddBtnClick}
            />
        </div>
    );
};

export default CardsList;
