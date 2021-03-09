import {
    workerForgotPassword,
    workerForgotPasswordSuccess
} from "./forgotPasswordSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {forgotPassword, forgotPasswordSuccess, forgotPasswordFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

const mockUser = {
    userName: 'Test'
}

describe('forgotPasswordSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerForgotPassword, mockUser)
            .provide([
                [matchers.call.fn(api.forgotPassword), mockUser],
            ])
            .put(forgotPasswordSuccess(mockUser))
            .dispatch(forgotPassword())
            .run();
    });
    it('should redirect on success', () => {
        return expectSaga(workerForgotPasswordSuccess, mockUser)
        .provide([
            [matchers.call.fn(history.push), true],
        ])
        .dispatch(forgotPasswordSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerForgotPassword, mockUser)
            .provide([
                [matchers.call.fn(api.forgotPassword), throwError(error)],
            ])
            .put(forgotPasswordFailure(error))
            .dispatch(forgotPassword())
            .run();
    });
});