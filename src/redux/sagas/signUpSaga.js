import {takeLatest, put, call} from 'redux-saga/effects';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    userRegisterSuccess,
    userRegisterFailure,
} from "../actions/user";
import {
    USERNAME_TO_CONFIRM,
} from "../../utils/constants";
import {history} from "../index";
import * as api from '../api/auth';
import { workerFailure } from "./common";

export function* watchUserRegister() {
    yield takeLatest(USER_REGISTER_REQUEST, workerUserRegister);
}

export function* workerUserRegister(action) {
    try {
        const response = yield call(() => api.userRegister(action));
        yield put(userRegisterSuccess(response.user.username));
    } catch (error) {
        yield put(userRegisterFailure(error));
    }
}

export function* watchUserRegisterSuccess() {
    yield takeLatest(USER_REGISTER_SUCCESS, workerUserRegisterSuccess);
}

export function* workerUserRegisterSuccess(action) {
    yield localStorage.setItem(USERNAME_TO_CONFIRM, action.userName);
    yield history.push('/confirmEmail');
}

export function* watchUserRegisterFailure() {
    yield takeLatest(USER_REGISTER_FAILURE, workerFailure);
}