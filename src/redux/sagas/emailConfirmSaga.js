import {takeLatest, put, call} from 'redux-saga/effects';
import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE,
    confirmEmailSuccess,
    confirmEmailFailure,
    CONFIRM_CHANGED_EMAIL_REQUEST,
    confirmChangedEmailSuccess,
    confirmChangedEmailFailure,
    CONFIRM_CHANGED_EMAIL_FAILURE, CONFIRM_CHANGED_EMAIL_SUCCESS,
} from "../actions/user";
import {
    USERNAME_TO_CONFIRM,
} from "../../utils/constants";
import {history} from "../index";
import * as api from '../api/auth';
import {workerFailure} from "./common";
import {showNotification} from "../actions/notifications";

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

export function* workerChangedEmailConfirm({payload}) {
    try {
        yield call(api.verifyCurrentUserAttributeSubmit, payload);
        yield put(confirmChangedEmailSuccess());
        yield put(showNotification({
            message: 'Profile details is updated',
            options: {
                key: 'profile-updated',
                variant: 'success'
            },
        }));
    } catch (error) {
        yield put(confirmChangedEmailFailure(error));
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
    yield takeLatest([CONFIRM_EMAIL_FAILURE, CONFIRM_CHANGED_EMAIL_FAILURE], workerFailure);
}
export function* watchChangedEmailConfirm() {
    yield takeLatest(CONFIRM_CHANGED_EMAIL_REQUEST, workerChangedEmailConfirm);
}