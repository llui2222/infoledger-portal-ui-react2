import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import Home from "../Home";
import Messenger from "../Messenger";
import NotFound from "../NotFound";
import ConfirmEmail from "../user/ConfirmEmail";

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
            <Route path="/confirmEmail">
                <ConfirmEmail/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Router;
