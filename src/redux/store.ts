import {createStore} from "redux";
import arrayOfCardsReducer from "./reducers/arrayOfCardsReducer";

const store = createStore(arrayOfCardsReducer);

export default store;
