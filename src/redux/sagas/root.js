import { all } from 'redux-saga/effects';
import {
    watchSignIn,
    watchSignInSuccess,
    watchSignInFailure
} from "./signInSaga";
import {
    watchLogOut,
    watchLogOutSuccess,
    watchLogOutFailure
} from "./logOutSaga";
import {
    watchUserRegister,
    watchUserRegisterSuccess,
    watchUserRegisterFailure
} from "./signUpSaga";
import {
    watchEmailConfirm,
    watchEmailConfirmSuccess,
    watchEmailConfirmFailure
} from "./emailConfirmSaga";
import {
    watchGetAuth,
    watchGetAuthFailure,
    watchGetAuthSuccess
} from "./isAuthSaga";
import {
    watchUpdateUser,
    watchUpdateUserAttributesSuccess,
    watchUpdateUserAttributesFailure
} from "./updateUserSaga";

export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserRegisterSuccess(),
        watchUserRegisterFailure(),
        watchEmailConfirm(),
        watchEmailConfirmSuccess(),
        watchEmailConfirmFailure(),
        watchSignIn(),
        watchSignInSuccess(),
        watchSignInFailure(),
        watchGetAuth(),
        watchGetAuthFailure(),
        watchGetAuthSuccess(),
        watchLogOut(),
        watchLogOutSuccess(),
        watchLogOutFailure(),
        watchUpdateUser(),
        watchUpdateUserAttributesSuccess(),
        watchUpdateUserAttributesFailure(),
    ])
};