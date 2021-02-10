import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import Home from "../Home";
import Messenger from "../Messenger";
import NotFound from "../NotFound";
import ConfirmEmail from "../user/ConfirmEmail";
import ProtectedRoute from "../common/ProtectedRoute";

function Router() {
    return (
        <Switch>
            <ProtectedRoute exact path="/">
                <Home/>
            </ProtectedRoute>
            <Route path="/login/">
                <Login/>
            </Route>
            <Route path="/sign-up/">
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
