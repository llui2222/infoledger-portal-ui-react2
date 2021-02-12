import {takeLatest, put, call} from 'redux-saga/effects';
import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE,
    confirmEmailSuccess,
    confirmEmailFailure,
} from "../actions/user";
import {
    USERNAME_TO_CONFIRM,
} from "../../utils/constants";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";

export function* watchEmailConfirm() {
    yield takeLatest(CONFIRM_EMAIL_REQUEST, workerEmailConfirm);
}

export function* workerEmailConfirm(action) {
    try {
        yield call(api.emailConfirm, action);
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