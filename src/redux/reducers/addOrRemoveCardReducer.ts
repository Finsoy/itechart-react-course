import {v4} from "uuid";
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface IAddOrRemoveCardAction {
    type: string;
    id?: string;
    cards: ICardsDataDTO[];
    setCards: (cards: ICardsDataDTO[]) => void
    cardHeaderText?: string;
    cardBodyText?: string;
}

const addOrRemoveCardReducer = (
    state: ICardsDataDTO[] = [],
    action: IAddOrRemoveCardAction
) => {
    switch (action.type) {
        case "ADD": {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                    title: action.cardHeaderText,
                    body: action.cardBodyText,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => {
                    console.log(`STATUS ${response.status}`);
                    return response.json();
                })
                .then(async (json) => {
                    json.id = v4();
                    action.setCards([...action.cards, json])
                    return;
                })
                .catch((e) => console.error(e));
            break;
        }
        case "REMOVE": {
            action.setCards(action.cards.filter((item) => item.id !== action.id));
            return;
        }
    }
    return state;
};

export default addOrRemoveCardReducer;
