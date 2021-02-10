import {takeLatest, put, call} from 'redux-saga/effects';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    userRegisterSuccess,
    userRegisterFailure,
    confirmEmailSuccess,
    confirmEmailFailure,
    signInSuccess,
    signInFailure
} from "../actions/users";
import {
    AUTH_USER_TOKEN_KEY,
    USERNAME_TO_CONFIRM,
} from "../../utils/constants";
import {showNotification} from "../actions/notifications";
import {history} from "../index";
import * as api from '../api/auth';

function showErrorMessage(message) {
    return put(showNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error'
        },
    }));
}

export function* watchUserRegister() {
    yield takeLatest(USER_REGISTER_REQUEST, workerUserRegister);
}

export function* workerUserRegister(action) {
    try {
        const response = yield call(() => api.userRegister(action));
        yield put(userRegisterSuccess(response.user.username));
    } catch (error) {
        yield put(userRegisterFailure(error));
    }
}

export function* watchUserRegisterSuccess() {
    yield takeLatest(USER_REGISTER_SUCCESS, workerUserRegisterSuccess);
}

export function* workerUserRegisterSuccess(action) {
    yield localStorage.setItem(USERNAME_TO_CONFIRM, action.user);
    yield history.push('/confirmEmail');
}

export function* watchUserRegisterFailure() {
    yield takeLatest(USER_REGISTER_FAILURE, workerFailure);
}

export function* workerFailure(action) {
    yield showErrorMessage(action.error.message);
}

export function* watchEmailConfirm() {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, workerEmailConfirm);
}

function* workerEmailConfirm(action) {
    try {
        yield call(() => api.emailConfirm(action));
        yield put(confirmEmailSuccess());
    } catch (error) {
        yield put(confirmEmailFailure(error));
    }
}

export function* watchEmailConfirmSuccess() {
    yield takeLatest(CONFIRM_EMAIL_SUCCESS, workerEmailConfirmSuccess);
}

export function* workerEmailConfirmSuccess() {
    yield localStorage.removeItem(USERNAME_TO_CONFIRM);
    yield history.push('/login');
}

export function* watchEmailConfirmFailure() {
    yield takeLatest(CONFIRM_EMAIL_FAILURE, workerFailure);
}

export function* watchSignIn() {
    yield takeLatest(SIGN_IN_REQUEST, workerSignIn);
}

function* workerSignIn(action) {
    try {
        const user = yield call(() => api.signIn(action));
        yield put(signInSuccess(user.signInUserSession.accessToken.jwtToken));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* watchSignInSuccess() {
    yield takeLatest(SIGN_IN_SUCCESS, workerSignInSuccess);
}

export function* workerSignInSuccess({token}) {
    yield localStorage.setItem(AUTH_USER_TOKEN_KEY, token);
    yield history.push('/');
}

export function* watchSignInFailure() {
    yield takeLatest(SIGN_IN_FAILURE, workerFailure);
}