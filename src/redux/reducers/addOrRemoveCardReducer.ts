import { v4 } from "uuid";
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface IAddOrRemoveCardAction {
    type: string;
    id?: string;
    cards: ICardsDataDTO[];
    setCards: (cards: ICardsDataDTO[]) => void;
    cardHeaderText?: string;
    cardBodyText?: string;
}

export const ADD = "ADD";
export const REMOVE = "REMOVE";

const addOrRemoveCardReducer = (
    state: ICardsDataDTO[] = [],
    action: IAddOrRemoveCardAction
) => {
    switch (action.type) {
        case ADD: {
            action.setCards([
                ...action.cards,
                { title: action.cardHeaderText!, body: action.cardBodyText!, id: v4() },
            ]);
            return;
        }
        case REMOVE: {
            action.setCards(action.cards.filter((item) => item.id !== action.id));
            return;
        }
    }
    return state;
};

export default addOrRemoveCardReducer;
