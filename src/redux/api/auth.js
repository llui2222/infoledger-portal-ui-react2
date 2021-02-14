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

export function updateUserAttributes({firstName, lastName, address, companyName}) {
    return Auth.currentAuthenticatedUser().then(user => {
        return Auth.updateUserAttributes(user, {
            'given_name': firstName,
            'family_name': lastName,
            'address': address,
            'custom:company_name': companyName
        }).catch(error => {
            return error;
        })
    })
}

export function currentAuthenticatedUser() {
    return Auth.currentAuthenticatedUser();
}

export function signOut() {
    return Auth.signOut();
}

export function currentSession() {
    return Auth.currentSession();
}