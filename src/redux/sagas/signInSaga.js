import {takeLatest, put, call} from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    signInSuccess,
    signInFailure
} from "../actions/user";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";

export function* watchSignIn() {
    yield takeLatest(SIGN_IN_REQUEST, workerSignIn);
}

function* workerSignIn(action) {
    try {
        yield call(() => api.signIn(action));
        yield put(signInSuccess());
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* watchSignInSuccess() {
    yield takeLatest(SIGN_IN_SUCCESS, workerSignInSuccess);
}

export function* workerSignInSuccess() {
    yield history.push('/');
}

export function* watchSignInFailure() {
    yield takeLatest(SIGN_IN_FAILURE, workerFailure);
}