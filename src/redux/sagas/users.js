import { takeLatest, put, call } from 'redux-saga/effects';
import {
    USER_REGISTER_REQUEST,
    CONFIRM_EMAIL_REQUEST,
    userRegisterSuccess,
    userRegisterFailure,
    confirmEmailSuccess,
    confirmEmailFailure
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
        yield history.push('/confirmEmail');
    } catch (err) {
        yield put(userRegisterFailure());
        yield showErrorMessage(err.message);
    }
}

function* workerEmailConfirm(action) {

    const { response, error } = yield call(() => api.emailConfirm(action));

    if (response) {
        yield put(confirmEmailSuccess());
        yield history.push('/login');
    } else {
        yield put(confirmEmailFailure());
        yield showErrorMessage(error.message);
    }
}

export function* watchUserRegister () {
    yield takeLatest(USER_REGISTER_REQUEST, workerUserRegister)
}

export function* watchEmailConfirm () {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, workerEmailConfirm)
}