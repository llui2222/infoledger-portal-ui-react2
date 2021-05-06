import {Auth} from "aws-amplify";
import amplifyAWSConfig from "../../amplifyAWSConfig";

Auth.configure(amplifyAWSConfig);

export function userRegister({ userName, password }) {
    return Auth.signUp(userName, password);
}

export function emailConfirm({userName, confirmationCode}) {
    return Auth.confirmSignUp(userName, confirmationCode)
}

export function signIn({userName, password}) {
    return Auth.signIn(userName, password);
}

export function verifyCurrentUserAttributeSubmit({attr, code}) {
    return Auth.verifyCurrentUserAttributeSubmit(attr, code);
}

export function updateUserAttributes(modifiedFields) {
    return Auth.currentAuthenticatedUser().then(user => {
        return Auth.updateUserAttributes(user, {
            ...modifiedFields
        }).catch(error => {
            return error;
        })
    })
}

export function currentAuthenticatedUser() {
    return Auth.currentAuthenticatedUser();
}

export function currentUserInfo() {
    return Auth.currentUserInfo();
}

export function verifyCurrentUserAttribute(attr) {
    return Auth.currentAuthenticatedUser().then(user => {
        return Auth.verifyUserAttribute(user, attr);
    })
}
export function verifyUserAttributeSubmit(attr, code) {
    return Auth.currentAuthenticatedUser().then(user => {
        return Auth.verifyUserAttributeSubmit(user, attr, code);
    })
}

export function currentCredentials() {
    return Auth.currentCredentials();
}

export function signOut() {
    return Auth.signOut();
}

export function currentSession() {
    return Auth.currentSession();
}

export function forgotPassword({userName}) {
    return Auth.forgotPassword(userName);
}

export function setNewPassword({ newPassword, userName, verificationCode}) {
    return Auth.forgotPasswordSubmit(userName, verificationCode, newPassword)
}

export function changePassword({ oldPass, newPass}) {
    return Auth.currentAuthenticatedUser().then(user => {
        return Auth.changePassword(user, oldPass, newPass)

    })
}

export async function getJwtToken() {
    const currentSession = await Auth.currentSession();
    const accessToken = currentSession.getAccessToken();
    return accessToken.getJwtToken();
}

export function setupTOTP({user}) {
    return Auth.setupTOTP(user);
}

export function verifyTotpToken({user, challengeAnswer}) {
    return Auth.verifyTotpToken(user, challengeAnswer);
}

export function setPreferredMFA({user, MFAType}) {
    return Auth.setPreferredMFA(user, MFAType);
}

export function confirmSignIn({user, code, mfaType}) {
    return Auth.confirmSignIn(user,code,mfaType);
}