import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Route, Switch, useLocation} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CardsList from "../pages/CardsList/CardsList";
import IMainProps from "../../models/IMainProps";

const Main = ({isLoading, cards, setCards, maxPages}: IMainProps) => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition timeout={300} key={location.key} classNames="item">
                <Switch>
                    <Route exact path="/main">
                        <MainPage/>
                    </Route>
                    <Route exact path="/cards">
                        <CardsList isLoading={isLoading}
                                   cards={cards}
                                   setCards={setCards}
                                   maxPages={maxPages}/>
                    </Route>
                    <Route path="*">
                        <MainPage/>
                    </Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default Main;
