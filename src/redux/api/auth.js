import {Auth} from "aws-amplify";
import awsconfig from "../../aws-exports";

Auth.configure(awsconfig);

export function userRegister({ userName, password }) {
    return Auth.signUp(userName, password);
}

export function emailConfirm({userName, confirmationCode}) {
    return Auth.confirmSignUp(userName, confirmationCode)
}

export function signIn({userName, password}) {
    return Auth.signIn(userName, password);
}

export function signOut() {
    return Auth.signOut();
}

export function currentSession() {
    return Auth.currentSession();
}