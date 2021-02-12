import {
    workerEmailConfirm,
    watchEmailConfirmSuccess
} from "./emailConfirmSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {confirmEmail, confirmEmailSuccess, confirmEmailFailure, CONFIRM_EMAIL_REQUEST} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

const mockAction = {
    type: CONFIRM_EMAIL_REQUEST,
    userName: 'Test',
    confirmationCode: 123
}

describe('emailConfirmSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerEmailConfirm, mockAction)
            .provide([
                [matchers.call.fn(api.emailConfirm), true],
            ])
            .put(confirmEmailSuccess())
            .dispatch(confirmEmail())
            .run();
    });
    it('should remove item from localStorage and redirect on success', () => {
        return expectSaga(watchEmailConfirmSuccess)
        .provide([
            [matchers.call.fn(localStorage.removeItem), true],
            [matchers.call.fn(history.push), true],
        ])
        .dispatch(confirmEmailSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerEmailConfirm, mockAction)
            .provide([
                [matchers.call.fn(api.emailConfirm), throwError(error)],
            ])
            .put(confirmEmailFailure(error))
            .dispatch(confirmEmail())
            .run();
    });
});