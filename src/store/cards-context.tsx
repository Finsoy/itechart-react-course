import React, {createContext} from 'react'
import ICardsDataDTO from "../models/ICardsDataDTO";

interface ICardsContext {
    cards: ICardsDataDTO[];
    setCards:  React.Dispatch<React.SetStateAction<ICardsDataDTO[]>>;
}

const CardsContext = createContext<ICardsContext>({
    cards: [],
    setCards: () => {}
})

export default CardsContext;
