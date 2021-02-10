import {put, call, takeEvery} from 'redux-saga/effects';
import {
    IS_AUTHENTICATED_REQUEST,
    isAuthenticatedSuccess,
    isAuthenticatedFailure, IS_AUTHENTICATED_FAILURE,
} from "../actions/user";
import * as api from '../api/auth';
import {history} from "../index";

export function* watchGetAuth() {
    yield takeEvery(IS_AUTHENTICATED_REQUEST, workerGetAuth);
}

export function* workerGetAuth() {
    try {
        const result = yield call(() => api.currentSession());
        if(result.isValid()) {
            yield put(isAuthenticatedSuccess());
        } else {
            yield put(isAuthenticatedFailure());
        }
    } catch (error) {
        console.log(error);
        yield put(isAuthenticatedFailure());
    }
}

export function* watchGetAuthFailure() {
    yield takeEvery(IS_AUTHENTICATED_FAILURE, workerGetAuthFailure);
}

export function* workerGetAuthFailure() {
    yield history.push('/login');
}