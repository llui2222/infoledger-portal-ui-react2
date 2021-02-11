import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../user/Login";
import LogOut from "../user/LogOut";
import SignUp from "../user/SignUp";
import Home from "../Home";
import Messenger from "../Messenger";
import NotFound from "../NotFound";
import ConfirmEmail from "../user/ConfirmEmail";
import ProtectedRoute from "../user/ProtectedRoute";
import UnauthorizedRoute from "../user/UnauthorizedRoute";

function Router() {
    return (
        <Switch>
            <ProtectedRoute exact path="/">
                <Home/>
            </ProtectedRoute>
            <UnauthorizedRoute path="/login">
                <Login/>
            </UnauthorizedRoute>
            <ProtectedRoute exact path="/logout">
                <LogOut/>
            </ProtectedRoute>
            <UnauthorizedRoute path="/sign-up">
                <SignUp/>
            </UnauthorizedRoute>
            <ProtectedRoute path="/messenger/:name">
                <Messenger/>
            </ProtectedRoute>
            <UnauthorizedRoute path="/confirm-email">
                <ConfirmEmail/>
            </UnauthorizedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}

export default Router;
