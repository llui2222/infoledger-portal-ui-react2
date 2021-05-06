import {takeLatest, put, call} from 'redux-saga/effects';
import {
    CONFIRM_MFA_REQUEST,
    CONFIRM_MFA_SUCCESS,
    CONFIRM_MFA_FAILURE,
    confirmMfaSuccess,
    confirmMfaFailure, setCurrentUser, signInSuccess
} from "../actions/user";
import {history} from "../index";
import * as api from '../api/auth';
import {workerFailure} from "./common";

export function* watchMfaConfirm() {
    yield takeLatest(CONFIRM_MFA_REQUEST, workerMfaConfirm);
}

export function* workerMfaConfirm(action) {
    try {
        const user = yield call(api.confirmSignIn, {...action, mfaType: 'SOFTWARE_TOKEN_MFA' });
        yield put(confirmMfaSuccess(user));
    } catch (error) {
        yield put(confirmMfaFailure(error));
    }
}

export function* watchMfaConfirmSuccess() {
    yield takeLatest(CONFIRM_MFA_SUCCESS, workerMfaConfirmSuccess);
}

export function* workerMfaConfirmSuccess(action) {
    yield put(setCurrentUser(action.user));
    yield put(signInSuccess());
    yield history.push('/');
}

export function* watchMfaConfirmFailure() {
    yield takeLatest(CONFIRM_MFA_FAILURE, workerFailure);
}