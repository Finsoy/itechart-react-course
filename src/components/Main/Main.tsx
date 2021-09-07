import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Route, Switch, useLocation} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CardsList from "../pages/CardsList/CardsList";

const Main = () => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition timeout={300} key={location.key} classNames="item">
                <Switch>
                    <Route exact path="/main">
                        <MainPage/>
                    </Route>
                    <Route exact path="/cards">
                        <CardsList/>
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
