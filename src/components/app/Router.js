import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../user/Login";
import LogOut from "../user/LogOut";
import SignUp from "../user/SignUp";
import NotFound from "../NotFound";
import ConfirmEmail from "../user/ConfirmEmail";
import ProtectedRoute from "../user/ProtectedRoute";
import UnauthorizedRoute from "../user/UnauthorizedRoute";
import Profile from "../user/Profile";
import EncryptDemo from "../EncryptDemo";
import ForgotPassword from "../user/ForgotPassword";
import SetNewPassword from "../user/SetNewPassword";
import Contacts from "../contacts/Contacts";
import Notifications from "../Notifications";
import Document from "../investment/Document";
import CompanyRouter from "../company/CompanyRouter";
import CompanyCreatePopup from "../company/CompanyCreatePopup";
import MfaSetup from "../user/MfaSetup";

function Router() {
    return (
        <Switch>

            <ProtectedRoute exact path="/">
                <Notifications/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/logout">
                <LogOut/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
                <Profile/>
            </ProtectedRoute>
            <ProtectedRoute path="/crypto">
                <EncryptDemo/>
            </ProtectedRoute>
            <ProtectedRoute path="/contacts">
                <Contacts/>
            </ProtectedRoute>
            <ProtectedRoute path="/investment/document">
                <Document/>
            </ProtectedRoute>
            <ProtectedRoute path="/company/:companyID">
                <CompanyRouter/>
            </ProtectedRoute>
            <ProtectedRoute path="/create-company">
                <CompanyCreatePopup/>
            </ProtectedRoute>
            <ProtectedRoute path="/mfa">
                <MfaSetup/>
            </ProtectedRoute>
            <UnauthorizedRoute path="/login">
                <Login/>
            </UnauthorizedRoute>
            <UnauthorizedRoute exact path="/forgot-password">
                <ForgotPassword/>
            </UnauthorizedRoute>
            <UnauthorizedRoute exact path="/set-new-password">
                <SetNewPassword/>
            </UnauthorizedRoute>
            <UnauthorizedRoute path="/sign-up">
                <SignUp/>
            </UnauthorizedRoute>
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
