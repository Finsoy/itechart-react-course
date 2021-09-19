import ICardsState from "../../models/ICardsState";
import ICardsDataDTO from "../../models/ICardsDataDTO";

const initialState = {
    cards: [],
}

const arrayOfCardsReducer = (state: ICardsState = initialState, action: { type: string, payload: ICardsDataDTO[] }) => {
    switch (action.type) {
        case "UPDATE": {
            return {cards: action.payload}
        }
    }
    return state;
}

export default arrayOfCardsReducer;
