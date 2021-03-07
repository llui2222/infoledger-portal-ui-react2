import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ENCRYPT_REQUEST,
    ENCRYPT_SUCCESS,
    ENCRYPT_FAILURE,
    DECRYPT_REQUEST,
    DECRYPT_SUCCESS,
    DECRYPT_FAILURE,
    encryptMessageSuccess,
    encryptMessageFailure,
    decryptMessageSuccess,
    decryptMessageFailure
} from "../actions/encryption";
import * as api from '../api/encryption';
import { workerFailure } from "./common";

export function* watchEncryptMessage() {
    yield takeLatest(ENCRYPT_REQUEST, workerEncryptMessage);
}

export function* workerEncryptMessage(action) {

    try {
        const encryptedMessage = yield call(api.encryptData, action);
        yield put(encryptMessageSuccess(encryptedMessage));
    } catch (error) {
        yield put(encryptMessageFailure(error));
    }
}

export function* watchEncryptMessageSuccess() {
    yield takeLatest(ENCRYPT_SUCCESS, workerEncryptMessageSuccess);
}

export function* workerEncryptMessageSuccess(encryptedMessage) {
    // console.log(encryptedMessage);
}

export function* watchEncryptMessageFailure() {
    yield takeLatest(ENCRYPT_FAILURE, workerFailure);
}

export function* watchDecryptMessage() {
    yield takeLatest(DECRYPT_REQUEST, workerDecryptMessage);
}

export function* workerDecryptMessage(action) {

    try {
        const decryptedMessage = yield call(api.decryptData, action);
        yield put(decryptMessageSuccess(decryptedMessage));
    } catch (error) {
        yield put(decryptMessageFailure(error));
    }
}

export function* watchDecryptMessageSuccess() {
    yield takeLatest(DECRYPT_SUCCESS, workerDecryptMessageSuccess);
}

export function* workerDecryptMessageSuccess(decryptedMessage) {
    // console.log(decryptedMessage);
}

export function* watchDecryptMessageFailure() {
    yield takeLatest(DECRYPT_FAILURE, workerFailure);
}