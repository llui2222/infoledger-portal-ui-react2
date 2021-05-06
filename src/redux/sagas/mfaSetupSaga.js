import {takeLatest, put, call} from 'redux-saga/effects';
import {
    GET_USER_MFA_SETUP_CODE_REQUEST,
    GET_USER_MFA_SETUP_CODE_FAILURE,
    VERIFY_USER_MFA_SETUP_CODE_REQUEST,
    VERIFY_USER_MFA_SETUP_CODE_SUCCESS,
    VERIFY_USER_MFA_SETUP_CODE_FAILURE,
    SET_PREFERRED_MFA_FAILURE,
    DISABLE_USER_MFA_REQUEST,
    DISABLE_USER_MFA_FAILURE,
    DISABLE_USER_MFA_SUCCESS,
    SET_PREFERRED_MFA_SUCCESS,
    getUserMfaSetupCodeSuccess,
    getUserMfaSetupCodeFailure,
    verifyUserMfaSetupCodeSuccess,
    verifyUserMfaSetupCodeFailure,
    setPreferredMfaSuccess,
    setPreferredMfaFailure,
    disableUserMfaSuccess,
    disableUserMfaFailure,
    isAuthenticated,
} from "../actions/user";
import * as api from '../api/auth';
import {workerFailure} from "./common";
import {history} from "../index";

export function* watchGetMfaSetupCode() {
    yield takeLatest(GET_USER_MFA_SETUP_CODE_REQUEST, workerGetMfaSetupCode);
}

export function* workerGetMfaSetupCode(action) {
    try {
        const code = yield call(api.setupTOTP, action);
        yield put(getUserMfaSetupCodeSuccess(code));
    } catch (error) {
        yield put(getUserMfaSetupCodeFailure(error));
    }
}

export function* watchVerifyMfaSetupCode() {
    yield takeLatest(VERIFY_USER_MFA_SETUP_CODE_REQUEST, workerVerifyMfaSetupCode);
}

export function* workerVerifyMfaSetupCode(action) {
    try {
        yield call(api.verifyTotpToken, action);
        yield put(verifyUserMfaSetupCodeSuccess(action.user));
    } catch (error) {
        yield put(verifyUserMfaSetupCodeFailure(error));
    }
}

export function* watchVerifyMfaSetupCodeSuccess() {
    yield takeLatest(VERIFY_USER_MFA_SETUP_CODE_SUCCESS, workerVerifyMfaSetupCodeSuccess);
}

export function* workerVerifyMfaSetupCodeSuccess(action) {
    try {
        yield call(api.setPreferredMFA, {user: action.user, MFAType: 'TOTP'});
        yield put(isAuthenticated(history.location.pathname));
        yield put(setPreferredMfaSuccess());
    } catch (error) {
        yield put(setPreferredMfaFailure(error));
    }
}

export function* watchDisableUserMfa() {
    yield takeLatest(DISABLE_USER_MFA_REQUEST, workerDisableUserMfa);
}

export function* workerDisableUserMfa(action) {
    try {
        // yield call(api.confirmDisableMfa, action); @todo: refactor to use login & password login flow
        yield call(api.setPreferredMFA, {user: action.user, MFAType: 'NOMFA'});
        yield put(disableUserMfaSuccess());
    } catch (error) {
        yield put(disableUserMfaFailure(error));
    }
}

export function* watchUserMfaSuccess() {
    yield takeLatest([DISABLE_USER_MFA_SUCCESS, SET_PREFERRED_MFA_SUCCESS], workerUserMfaSuccess);
}

export function* workerUserMfaSuccess() {
    yield put(isAuthenticated(history.location.pathname));
}

export function* watchDisableUserMfaFailure() {
    yield takeLatest(DISABLE_USER_MFA_FAILURE, workerFailure);
}

export function* watchGetMfaSetupCodeFailure() {
    yield takeLatest(GET_USER_MFA_SETUP_CODE_FAILURE, workerFailure);
}

export function* watchVerifyMfaSetupCodeFailure() {
    yield takeLatest(VERIFY_USER_MFA_SETUP_CODE_FAILURE, workerFailure);
}

export function* watchSetPreferredMfaFailure() {
    yield takeLatest(SET_PREFERRED_MFA_FAILURE, workerFailure);
}