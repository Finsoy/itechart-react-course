import ICardsDataDTO from "./ICardsDataDTO";
import React from "react";

export default interface IMainProps {
    isLoading: boolean;
    cards: ICardsDataDTO[];
    setCards: React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
    maxPages: number;
}
