import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Route, Switch, useLocation} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CardsList from "../pages/CardsList/CardsList";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import CardDetails from "../pages/CardDetails/CardDetails";

const Main = () => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition timeout={300} key={location.key} classNames="item">
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/main" component={MainPage}/>
                    <Route exact path="/cards" component={CardsList}/>
                    <Route exact path="/cards/:id" component={CardDetails}/>
                    <Route path="*" component={ErrorPage}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default Main;
