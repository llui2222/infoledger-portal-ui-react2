import { all } from 'redux-saga/effects';
import {
    watchUserRegister,
    watchUserRegisterSuccess,
    watchUserRegisterFailure,
    watchEmailConfirm,
    watchEmailConfirmSuccess,
    watchEmailConfirmFailure,
    watchSignIn,
    watchSignInSuccess,
    watchSignInFailure
} from "./users";

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
    ])
};