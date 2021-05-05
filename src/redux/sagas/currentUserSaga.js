import {takeLatest, put, call} from 'redux-saga/effects';
import {SET_CURRENT_USER} from "../actions/user";

export function* watchSetCurrentUser() {
    yield takeLatest(SET_CURRENT_USER, workerSetCurrentUser);
}

export function* workerSetCurrentUser(action) {
    if(action.userData) {

    }
}