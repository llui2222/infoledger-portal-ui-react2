import {takeLatest, put, call} from 'redux-saga/effects';
import {
    UPDATE_USER_ATTRIBUTES_REQUEST,
    UPDATE_USER_ATTRIBUTES_SUCCESS,
    UPDATE_USER_ATTRIBUTES_FAILURE,
    updateUserAttributesSuccess,
    updateUserAttributesFailure,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    changePasswordSuccess, changePasswordFailure
} from "../actions/user";
import * as api from '../api/auth';
import {workerFailure} from "./common";
import {showNotification} from "../actions/notifications";

export function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_REQUEST, workerUpdateUser);
}

export function* workerUpdateUser({
                                      payload: {
                                          info, confirmationCallback = () => {
                                          }
                                      }
                                  }) {
    try {

        const changedFields = Object.keys(info)
        yield call(api.updateUserAttributes, info);
        if (changedFields.includes('email')) {
            yield call(api.verifyCurrentUserAttribute, 'email')
            confirmationCallback(info.email)
        }
        yield put(updateUserAttributesSuccess());
    } catch (error) {
        yield put(updateUserAttributesFailure(error));
    }
}

export function* watchUpdateUserAttributesSuccess() {
    yield takeLatest([UPDATE_USER_ATTRIBUTES_SUCCESS, CHANGE_PASSWORD_SUCCESS], workerUpdateUserAttributesSuccess);
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
    yield takeLatest([UPDATE_USER_ATTRIBUTES_FAILURE,CHANGE_PASSWORD_FAILURE], workerFailure);
}

export function* workerChangePassword({payload: {oldPass, newPass}}) {
    try {
        yield call(api.changePassword, oldPass, newPass)
        yield put(changePasswordSuccess())
    } catch (e) {
        yield put(changePasswordFailure())
    }

}

export function* watchUpdateUserPassword() {
    yield takeLatest(CHANGE_PASSWORD_REQUEST, workerChangePassword);
}