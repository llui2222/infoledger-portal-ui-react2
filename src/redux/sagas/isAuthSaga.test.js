import {
    workerGetAuth,
    workerGetAuthSuccess
} from "./isAuthSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {isAuthenticated, isAuthenticatedSuccess, isAuthenticatedFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

const mockAction = {
    userName: 'Test',
    password: 'TestPassword'
}

describe('signInSaga', () => {
    it('should call api and dispatch success action', async () => {

        const mockUser = {
            userName: 'Test'
        }

        return expectSaga(workerGetAuth)
            .provide([
                [matchers.call.fn(api.currentSession), mockUser],
            ])
            .put(isAuthenticatedSuccess())
            .dispatch(isAuthenticated())
            .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerGetAuth, mockAction)
            .provide([
                [matchers.call.fn(api.currentSession), throwError(error)],
            ])
            .put(isAuthenticatedFailure(error))
            .dispatch(isAuthenticated())
            .run();
    });
});