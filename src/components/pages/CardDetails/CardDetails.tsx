import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import CardsContext from "../../../store/cards-context";
import MyTabs from "../../MyTabs/MyTabs";

const CardDetails = () => {
    const params: { id: string } = useParams();
    const ctx = useContext(CardsContext)
    const {cards} = ctx;
    let card = cards.filter(item => item.id.toString() === params.id)

    return (
        <div>
            <MyTabs cards={cards} tabValue={params.id}/>
            {card.length ? card.map(item => {
                return (
                    <div key={item.id}>
                        <p>Card ID: {item.id}</p>
                        <p>Card Title: {item.title}</p>
                    </div>
                )
            }) : <h1>item not found</h1>}
        </div>
    );
};

export default CardDetails;
