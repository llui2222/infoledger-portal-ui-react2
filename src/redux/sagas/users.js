import { takeLatest, put, call } from 'redux-saga/effects';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE
} from "../actions/users";
import { showNotification } from "../actions/notifications";
import { history } from "../index";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function userRegister({ email, password }) {

    return Auth.signUp({
        username: email,
        password: password
    }).then(response => ({ response }))
        .catch(error => ({ error }))
}

function emailConfirm({ userName, confirmationCode }) {

    return Auth.confirmSignUp(userName, confirmationCode)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function showErrorMessage(message) {
    return put(showNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error'
        },
    }));
}

function* workerUserRegister(action) {

    const { response, error } = yield call(() => userRegister(action));

    if (response) {
        yield put({
            type: USER_REGISTER_SUCCESS,
            user: response.user.username
        });
        yield history.push('/confirmEmail');
    } else {
        yield put({type: USER_REGISTER_FAILURE});
        yield showErrorMessage(error.message);
    }
}

function* workerEmailConfirm(action) {

    const { response, error } = yield call(() => emailConfirm(action));

    if (response) {
        yield put({
            type: CONFIRM_EMAIL_SUCCESS
        });
        yield history.push('/');
    } else {
        yield put({type: CONFIRM_EMAIL_FAILURE});
        yield showErrorMessage(error.message);
    }
}

export function* watchUserRegister () {
    yield takeLatest(USER_REGISTER_REQUEST, workerUserRegister)
}

export function* watchEmailConfirm () {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, workerEmailConfirm)
}