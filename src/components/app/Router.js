import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Login";
import SignUp from "../SignUp";
import Home from "../Home";
import Messenger from "../Messenger";
import NotFound from "../NotFound";

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/login/">
                <Login/>
            </Route>
            <Route path="/signup/">
                <SignUp/>
            </Route>
            <Route path="/messenger/:name">
                <Messenger/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Router;
