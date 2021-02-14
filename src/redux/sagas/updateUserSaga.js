import {takeLatest, put, call} from 'redux-saga/effects';
import {
    UPDATE_USER_ATTRIBUTES_REQUEST,
    UPDATE_USER_ATTRIBUTES_SUCCESS,
    UPDATE_USER_ATTRIBUTES_FAILURE,
    updateUserAttributesSuccess,
    updateUserAttributesFailure
} from "../actions/user";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";

export function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_REQUEST, workerUpdateUser);
}

export function* workerUpdateUser(action) {
    try {
        yield call(api.updateUserAttributes, action);
        yield put(updateUserAttributesSuccess());
    } catch (error) {
        yield put(updateUserAttributesFailure(error));
    }
}

export function* watchUpdateUserAttributesSuccess() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_SUCCESS, workerUpdateUserAttributesSuccess);
}

export function* workerUpdateUserAttributesSuccess() {
    yield history.push('/');
}

export function* watchUpdateUserAttributesFailure() {
    yield takeLatest(UPDATE_USER_ATTRIBUTES_FAILURE, workerFailure);
}