import { all } from 'redux-saga/effects';
import {
    watchEmailConfirm,
    watchUserRegister,
    watchUserRegisterSuccess,
    watchEmailConfirmSuccess,
    watchUserRegisterFailure,
} from "./users";

export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchEmailConfirm(),
        watchUserRegisterSuccess(),
        watchEmailConfirmSuccess(),
        watchUserRegisterFailure(),
    ])
};