import ICardsState from "../../models/ICardsState";
import ICardsDataDTO from "../../models/ICardsDataDTO";

const UPDATE = "UPDATE";
const GET_ALL_CARDS = "GET_ALL_CARDS";

const initialState = {
    cards: [],
};

const arrayOfCardsReducer = (
    state: ICardsState = initialState,
    action: { type: string; payload: ICardsDataDTO[] }
) => {
    switch (action.type) {
        case UPDATE: {
            return { cards: action.payload };
        }
        case GET_ALL_CARDS: {
            return { ...state.cards, cards: [...action.payload] };
        }
    }
    return state;
};

export const updateAction = (payload: ICardsDataDTO[]) => {
    return {
        type: UPDATE,
        payload,
    };
};

export const getAllCardsAction = (payload: ICardsDataDTO[]) => {
    return {
        type: GET_ALL_CARDS,
        payload,
    };
};

export default arrayOfCardsReducer;
