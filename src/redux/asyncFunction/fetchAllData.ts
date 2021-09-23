import { Dispatch } from "react";
import ICardsDataDTO from "../../models/ICardsDataDTO";
import { getAllCardsAction } from "../reducers/arrayOfCardsReducer";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const LIMIT_CARDS = 10;

export const fetchAllData = () => {
    return async (
        dispatch: Dispatch<{ type: string; payload: ICardsDataDTO[] }>
    ) => {
        const response = await fetch(`${API_URL}?_limit=${LIMIT_CARDS}`);
        const json: ICardsDataDTO[] = await response.json();
        dispatch(getAllCardsAction(json));
    };
};
