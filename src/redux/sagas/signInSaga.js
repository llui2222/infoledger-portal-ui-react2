import {takeLatest, put, call} from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    signInSuccess,
    signInFailure
} from "../actions/user";
import {
    AUTH_USER_TOKEN_KEY
} from "../../utils/constants";
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

export function* workerSignInSuccess({token}) {
    yield localStorage.setItem(AUTH_USER_TOKEN_KEY, token);
    yield history.push('/');
}

export function* watchSignInFailure() {
    yield takeLatest(SIGN_IN_FAILURE, workerFailure);
}