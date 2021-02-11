import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    IS_AUTHENTICATED_REQUEST,
    IS_AUTHENTICATED_FAILURE,
    IS_AUTHENTICATED_SUCCESS,
    isAuthenticatedSuccess,
    isAuthenticatedFailure,
} from "../actions/user";
import * as api from '../api/auth';
import { workerFailure } from "./common";
import {history} from "../index";
import {routesNotAuthorizedOnly} from "../../utils/constants";

export function* watchGetAuth() {
    yield takeEvery(IS_AUTHENTICATED_REQUEST, workerGetAuth);
}

export function* workerGetAuth() {

    try {
        const result = yield call(() => api.currentSession());
        if(result.isValid()) {
            yield put(isAuthenticatedSuccess());
        } else {
            yield put(isAuthenticatedFailure({message: 'User is not logged in'}));
        }
    } catch (error) {
        yield put(isAuthenticatedFailure(error));
    }
}

export function* watchGetAuthFailure() {
    yield takeLatest(IS_AUTHENTICATED_FAILURE, workerGetAuthFailure);
}

export function* workerGetAuthFailure() {
    yield workerFailure();
    if(!routesNotAuthorizedOnly.includes(history.location.pathname)) {
        yield history.push('/login');
    }
}

export function* watchGetAuthSuccess() {
    yield takeLatest(IS_AUTHENTICATED_SUCCESS, workerGetAuthSuccess);
}

export function* workerGetAuthSuccess() {
    if(routesNotAuthorizedOnly.includes(history.location.pathname)) {
        yield history.push('/');
    }
}