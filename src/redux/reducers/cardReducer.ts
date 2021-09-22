import {myCardAction} from "../../models/enumsActions/myCardAction";

interface ICardState {
    title?: string;
    body?: string;
    prevTitle?: string;
    prevBody?: string;
    isErrorTitle?: boolean;
    isErrorBody?: boolean;
}

const cardReducer = (
    state: ICardState,
    action: { type: string; payload: ICardState }
): ICardState => {
    switch (action.type) {
        case myCardAction.TITLE_CHANGE: {
            const newState = {...state};
            newState.title = action.payload.title;
            newState.isErrorTitle = action.payload.isErrorTitle;
            return newState;
        }
        case myCardAction.BODY_CHANGE: {
            const newState = {...state};
            newState.body = action.payload.body;
            newState.isErrorBody = action.payload.isErrorBody;
            return newState;
        }
        case myCardAction.PREV_TITLE_CHANGE: {
            const newState = {...state};
            newState.prevTitle = action.payload.prevTitle;
            newState.title = action.payload.prevTitle;
            return newState;
        }
        case myCardAction.PREV_BODY_CHANGE: {
            const newState = {...state};
            newState.prevBody = action.payload.prevBody;
            newState.body = action.payload.prevBody;
            return newState;
        }
        default:
            return state;
    }
};

export default cardReducer;
