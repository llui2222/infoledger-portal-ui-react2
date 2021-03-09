import {
    workerSetNewPassword,
    workerSetNewPasswordSuccess
} from "./setNewPasswordSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {setNewPassword, setNewPasswordSuccess, setNewPasswordFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

const mockAction = {
    userName: 'Test',
    verificationCode: 123456,
    newPassword: 'TestPassword'
}

describe('setNewPasswordSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerSetNewPassword, mockAction)
            .provide([
                [matchers.call.fn(api.setNewPassword), mockAction],
            ])
            .put(setNewPasswordSuccess())
            .dispatch(setNewPassword())
            .run();
    });
    it('should redirect on success', () => {
        return expectSaga(workerSetNewPasswordSuccess)
        .provide([
            [matchers.call.fn(history.push), true],
        ])
        .dispatch(setNewPasswordSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerSetNewPassword, mockAction)
            .provide([
                [matchers.call.fn(api.setNewPassword), throwError(error)],
            ])
            .put(setNewPasswordFailure(error))
            .dispatch(setNewPassword())
            .run();
    });
});