import {takeLatest, put, call} from 'redux-saga/effects';
import {
    UPDATE_USER_ATTRIBUTES_REQUEST,
    UPDATE_USER_ATTRIBUTES_SUCCESS,
    UPDATE_USER_ATTRIBUTES_FAILURE,
    updateUserAttributesSuccess,
    updateUserAttributesFailure
} from "../actions/user";
import * as api from '../api/auth';
import {workerFailure} from "./common";
import {showNotification} from "../actions/notifications";

export function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_REQUEST, workerUpdateUser);
}

export function* workerUpdateUser({payload: {info, confirmationCallback = () => {}}}) {
    try {
        yield call(api.updateUserAttributes, info);
        if (Object.keys(info).includes('email')) {
            yield call(api.verifyCurrentUserAttribute, 'email')
            confirmationCallback(info.email)
        }
        yield put(updateUserAttributesSuccess());
    } catch (error) {
        yield put(updateUserAttributesFailure(error));
    }
}

export function* watchUpdateUserAttributesSuccess() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_SUCCESS, workerUpdateUserAttributesSuccess);
}

export function* workerUpdateUserAttributesSuccess() {
    yield put(showNotification({
        message: 'Profile details is updated',
        options: {
            key: 'profile-updated',
            variant: 'success'
        },
    }));
}

export function* watchUpdateUserAttributesFailure() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_FAILURE, workerFailure);
}