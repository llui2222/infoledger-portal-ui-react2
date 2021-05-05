import {takeLatest, put, call} from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    signInSuccess,
    signInFailure,
    setUserMfa
} from "../actions/user";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";
import * as infoLedgerSync from "../api/tabsSync";

export function* watchSignIn() {
    yield takeLatest(SIGN_IN_REQUEST, workerSignIn);
}

export function* workerSignIn(action) {
    try {
        const user = yield call(api.signIn, action);
        if(user.challengeName) {
            yield put(setUserMfa(user.challengeName));
        } else {
            yield put(signInSuccess());
        }
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* watchSignInSuccess() {
    yield takeLatest(SIGN_IN_SUCCESS, workerSignInSuccess);
}

export function* workerSignInSuccess() {
    yield history.push('/');
    yield call(infoLedgerSync.postMessage,'UserLoggedIn');
}

export function* watchSignInFailure() {
    yield takeLatest(SIGN_IN_FAILURE, workerFailure);
}