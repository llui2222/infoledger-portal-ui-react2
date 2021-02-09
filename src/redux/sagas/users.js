import { takeLatest, put, call } from 'redux-saga/effects';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    userRegisterSuccess,
    userRegisterFailure,
    confirmEmailSuccess,
    confirmEmailFailure,
} from "../actions/users";
import { showNotification } from "../actions/notifications";
import { history } from "../index";
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

export function* workerUserRegister(action) {
    try {
        const response = yield call(() => api.userRegister(action));
        yield put(userRegisterSuccess(response.user.username));
    } catch (error) {
        yield put(userRegisterFailure(error));
    }
}

export function* workerUserRegisterSuccess() {
    yield history.push('/confirmEmail');
}

export function* workerUserRegisterFailure(action) {
    yield showErrorMessage(action.error.message);
}

export function* workerEmailConfirmSuccess() {
    yield history.push('/login');
}

function* workerEmailConfirm(action) {

    const { response, error } = yield call(() => api.emailConfirm(action));

    if (response) {
        yield put(confirmEmailSuccess());
    } else {
        yield put(confirmEmailFailure());
        yield showErrorMessage(error.message);
    }
}

export function* watchUserRegister () {
    yield takeLatest(USER_REGISTER_REQUEST, workerUserRegister)
}

export function* watchUserRegisterSuccess () {
    yield takeLatest(USER_REGISTER_SUCCESS, workerUserRegisterSuccess)
}

export function* watchUserRegisterFailure () {
    yield takeLatest(USER_REGISTER_FAILURE, workerUserRegisterFailure)
}

export function* watchEmailConfirm () {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, workerEmailConfirm)
}

export function* watchEmailConfirmSuccess () {
    yield takeLatest(CONFIRM_EMAIL_SUCCESS, workerEmailConfirmSuccess)
}