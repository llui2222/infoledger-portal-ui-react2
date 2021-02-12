import {
    workerLogOut,
    workerLogOutSuccess
} from "./logOutSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {LogOut, LogOutSuccess, LogOutFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

describe('logOutSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerLogOut)
            .provide([
                [matchers.call.fn(api.signOut)],
            ])
            .put(LogOutSuccess())
            .dispatch(LogOut())
            .run();
    });
    it('should redirect on success', () => {
        return expectSaga(workerLogOutSuccess)
        .provide([
            [matchers.call.fn(history.push), true],
        ])
        .dispatch(LogOutSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerLogOut)
            .provide([
                [matchers.call.fn(api.signOut), throwError(error)],
            ])
            .put(LogOutFailure(error))
            .dispatch(LogOut())
            .run();
    });
});