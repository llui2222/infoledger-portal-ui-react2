import {
    workerUserRegister,
    workerUserRegisterSuccess
} from "./signUpSaga";
import {
    userRegister,
    userRegisterFailure,
    userRegisterSuccess
} from "../actions/user";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {throwError} from "redux-saga-test-plan/providers";

const mockAction = {
    userName: 'Test',
    password: 'TestPassword'
}

const mockUser = {
    user: {
        username: 'Test'
    }
}

describe('signUpSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerUserRegister, mockAction)
            .provide([
                [matchers.call.fn(api.userRegister), mockUser],
            ])
            .put(userRegisterSuccess(mockUser.user.username))
            .dispatch(userRegister(mockAction))
            .run();
    });
    it('should redirect on success', () => {
        return expectSaga(workerUserRegisterSuccess, mockUser.user.username)
            .provide([
                [matchers.call.fn(history.push), true],
            ])
            .dispatch(userRegisterSuccess(mockUser.user.username))
            .run();
    });

    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerUserRegister, mockAction)
            .provide([
                [matchers.call.fn(api.userRegister), throwError(error)],
            ])
            .put(userRegisterFailure(error))
            .dispatch(userRegister(mockAction))
            .run();
    });
});