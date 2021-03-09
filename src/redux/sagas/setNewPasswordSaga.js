import {takeLatest, put, call} from 'redux-saga/effects';
import {
    SET_NEW_PASSWORD_REQUEST,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAILURE,
    setNewPasswordSuccess,
    setNewPasswordFailure
} from "../actions/user";
import * as api from '../api/auth';
import { workerFailure } from "./common";
import {USERNAME_TO_PASSWORD_RESET} from "../../utils/constants";
import {history} from "../index";

export function* watchSetNewPassword() {
    yield takeLatest(SET_NEW_PASSWORD_REQUEST, workerSetNewPassword);
}

export function* workerSetNewPassword(action) {
    try {
        yield call(api.setNewPassword, action);
        yield put(setNewPasswordSuccess());
    } catch (error) {
        yield put(setNewPasswordFailure(error));
    }
}

export function* watchSetNewPasswordSuccess() {
    yield takeLatest(SET_NEW_PASSWORD_SUCCESS, workerSetNewPasswordSuccess);
}

export function* workerSetNewPasswordSuccess() {
    yield localStorage.removeItem(USERNAME_TO_PASSWORD_RESET);
    yield history.push('/login');
}

export function* watchSetNewPasswordFailure() {
    yield takeLatest(SET_NEW_PASSWORD_FAILURE, workerFailure);
}