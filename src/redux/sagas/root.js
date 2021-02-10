import { all } from 'redux-saga/effects';
import {
    watchSignIn,
    watchSignInSuccess,
    watchSignInFailure
} from "./signInSaga";
import {
    watchUserRegister,
    watchUserRegisterSuccess,
    watchUserRegisterFailure,
} from "./signUpSaga";
import {
    watchEmailConfirm,
    watchEmailConfirmSuccess,
    watchEmailConfirmFailure
} from "./emailConfirmSaga";
import {
    watchGetAuth,
    watchGetAuthFailure,
} from "./isAuthSaga";

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
    ])
};