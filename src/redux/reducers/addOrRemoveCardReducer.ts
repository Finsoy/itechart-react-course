import { v4 } from "uuid";
import ICardsDataDTO from "../../models/ICardsDataDTO";
import React from "react";

interface IAddOrRemoveCardAction {
    type: string;
    id?: string;
    setCards: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
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
                    if (action.setCards) {
                        return action.setCards((prevState) => [...prevState, json]);
                    }
                })
                .catch((e) => console.error(e));
            break;
        }
        case "REMOVE": {
            if (action.setCards) {
                action.setCards((prevState) => {
                    return prevState.filter((item) => item.id !== action.id);
                });
            }
        }
    }
    return state;
};

export default addOrRemoveCardReducer;
