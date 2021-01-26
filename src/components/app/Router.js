import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Messenger from "../Messenger";

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/login/">
                <Login/>
            </Route>
            <Route path="/messenger/:name">
                <Messenger/>
            </Route>
        </Switch>
    );
}

export default Router;
