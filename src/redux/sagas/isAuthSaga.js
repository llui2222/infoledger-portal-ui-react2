import {put, all, call, takeEvery, takeLatest} from 'redux-saga/effects';
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
import {fieldsRequired} from "../../utils/constants";

export function* watchGetAuth() {
    yield takeEvery(IS_AUTHENTICATED_REQUEST, workerGetAuth);
}

export function* workerGetAuth() {

    try {
        const user = yield call(api.currentAuthenticatedUser);
        yield put(isAuthenticatedSuccess(user));
    } catch (error) {
        yield put(isAuthenticatedFailure(error));
    }
}

export function* watchGetAuthFailure() {
    yield takeLatest(IS_AUTHENTICATED_FAILURE, workerGetAuthFailure);
}

export function* workerGetAuthFailure() {
    yield workerFailure();
    if(!isCurrentRouteInUnauthorizedList) {
        yield history.push('/login');
    }
}

export function* watchGetAuthSuccess() {
    yield takeLatest(IS_AUTHENTICATED_SUCCESS, workerGetAuthSuccess);
}

export function* workerGetAuthSuccess(action) {

    yield all(fieldsRequired.map(attr => call(redirectToCompleteProfile, attr, action.user.attributes)));

    if(isCurrentRouteInUnauthorizedList) {
        yield history.push('/');
    }
}

const isCurrentRouteInUnauthorizedList = routesNotAuthorizedOnly.includes(history.location.pathname);

const redirectToCompleteProfile = (attr, attributes) => {
    if(!attributes[attr] && history.location.pathname !== '/profile') {
        history.push('/profile');
    }
}