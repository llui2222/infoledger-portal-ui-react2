import {takeLatest, put, call} from 'redux-saga/effects';
import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    forgotPasswordSuccess,
    forgotPasswordFailure
} from "../actions/user";
import * as api from '../api/auth';
import { workerFailure } from "./common";
import {USERNAME_TO_PASSWORD_RESET} from "../../utils/constants";
import {history} from "../index";

export function* watchForgotPassword() {
    yield takeLatest(FORGOT_PASSWORD_REQUEST, workerForgotPassword);
}

export function* workerForgotPassword(action) {
    try {
        yield call(api.forgotPassword, action);
        yield put(forgotPasswordSuccess(action));
    } catch (error) {
        yield put(forgotPasswordFailure(error));
    }
}

export function* watchForgotPasswordSuccess() {
    yield takeLatest(FORGOT_PASSWORD_SUCCESS, workerForgotPasswordSuccess);
}

export function* workerForgotPasswordSuccess(action) {
    yield localStorage.setItem(USERNAME_TO_PASSWORD_RESET, action.userName);
    yield history.push('/set-new-password');
}

export function* watchForgotPasswordFailure() {
    yield takeLatest(FORGOT_PASSWORD_FAILURE, workerFailure);
}