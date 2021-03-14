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
import Profile from "../user/Profile";
import Crypto from "../Crypto";
import ForgotPassword from "../user/ForgotPassword";
import SetNewPassword from "../user/SetNewPassword";
import Contacts from "../contacts/Contacts";

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
            <UnauthorizedRoute exact path="/forgot-password">
                <ForgotPassword/>
            </UnauthorizedRoute>
            <UnauthorizedRoute exact path="/set-new-password">
                <SetNewPassword/>
            </UnauthorizedRoute>
            <UnauthorizedRoute path="/sign-up">
                <SignUp/>
            </UnauthorizedRoute>
            <ProtectedRoute path="/profile">
                <Profile/>
            </ProtectedRoute>
            <ProtectedRoute path="/contacts">
                <Contacts/>
            </ProtectedRoute>
            <ProtectedRoute path="/crypto">
                <Crypto/>
            </ProtectedRoute>
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
