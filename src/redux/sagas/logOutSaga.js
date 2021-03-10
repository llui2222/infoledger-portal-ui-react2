import {takeLatest, put, call} from 'redux-saga/effects';
import {
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LogOutSuccess,
    LogOutFailure
} from "../actions/user";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";
import * as infoLedgerSync from "../api/tabsSync";

export function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, workerLogOut);
}

export function* workerLogOut() {
    try {
        yield call(api.signOut);
        yield put(LogOutSuccess());
    } catch (error) {
        yield put(LogOutFailure(error));
    }
}

export function* watchLogOutSuccess() {
    yield takeLatest(LOG_OUT_SUCCESS, workerLogOutSuccess);
}

export function* workerLogOutSuccess() {
    yield call(infoLedgerSync.postMessage,'UserLoggedOut');
    yield history.push('/login');
}

export function* watchLogOutFailure() {
    yield takeLatest(LOG_OUT_FAILURE, workerFailure);
}