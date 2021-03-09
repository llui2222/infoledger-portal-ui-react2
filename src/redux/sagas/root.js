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
import {
    watchEncryptMessage,
    watchEncryptMessageSuccess,
    watchEncryptMessageFailure,
    watchDecryptMessage,
    watchDecryptMessageSuccess,
    watchDecryptMessageFailure
} from "./encryptionSaga";
import {
    watchForgotPassword,
    watchForgotPasswordSuccess,
    watchForgotPasswordFailure,
} from "./forgotPasswordSaga";
import {
    watchSetNewPassword,
    watchSetNewPasswordSuccess,
    watchSetNewPasswordFailure,
} from "./setNewPasswordSaga";

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
        watchEncryptMessage(),
        watchEncryptMessageSuccess(),
        watchEncryptMessageFailure(),
        watchDecryptMessage(),
        watchDecryptMessageSuccess(),
        watchDecryptMessageFailure(),
        watchForgotPassword(),
        watchForgotPasswordSuccess(),
        watchForgotPasswordFailure(),
        watchSetNewPassword(),
        watchSetNewPasswordSuccess(),
        watchSetNewPasswordFailure(),
    ])
};