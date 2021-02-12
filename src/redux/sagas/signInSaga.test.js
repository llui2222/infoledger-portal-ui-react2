import {
    workerSignIn,
    workerSignInSuccess
} from "./signInSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {signIn, signInSuccess, signInFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';

const mockAction = {
    userName: 'Test',
    password: 'TestPassword'
}

describe('workerSignIn', () => {
    it('should call api and dispatch success action', async () => {

        const mockUser = {
            userName: 'Test'
        }

        return expectSaga(workerSignIn, mockAction)
            .provide([
                [matchers.call.fn(api.signIn), mockUser],
            ])
            .put(signInSuccess('Test'))
            .dispatch(signIn())
            .run();
    });
    it('should redirect on success', () => {
        return expectSaga(workerSignInSuccess)
        .provide([
            [matchers.call.fn(history.push), true],
        ])
        .dispatch(signInSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerSignIn, mockAction)
            .provide([
                [matchers.call.fn(api.signIn), throwError(error)],
            ])
            .put(signInFailure(error))
            .dispatch(signIn())
            .run();
    });
});