import {
    workerUpdateUser,
    workerUpdateUserAttributesSuccess
} from "./updateUserSaga";
import * as api from '../api/auth';
import { history } from "../index";
import {expectSaga} from 'redux-saga-test-plan';
import {updateUserAttributes, updateUserAttributesSuccess, updateUserAttributesFailure} from "../actions/user";
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';
import {showNotification} from "../actions/notifications";

const mockAction = {
    firstName: 'TestUser',
    lastName: 'TestUserLast',
    address: 'Test Location 42',
    companyName: 'Test Company Ltd.',
}

describe('updateUserSaga', () => {
    it('should call api and dispatch success action', async () => {

        return expectSaga(workerUpdateUser)
            .provide([
                [matchers.call.fn(api.updateUserAttributes)],
            ])
            .put(updateUserAttributesSuccess())
            .dispatch(updateUserAttributes(mockAction))
            .run();
    });
    it('should display message on success', () => {
        return expectSaga(workerUpdateUserAttributesSuccess)
            .put(showNotification({
                message: 'Profile details is updated',
                options: {
                    key: 'profile-updated',
                    variant: 'success'
                },
            }))
        .dispatch(updateUserAttributesSuccess())
        .run();
    });
    it('should dispatch error on failure', () => {

        const error = new Error('error');

        return expectSaga(workerUpdateUser)
            .provide([
                [matchers.call.fn(api.updateUserAttributes), throwError(error)],
            ])
            .put(updateUserAttributesFailure(error))
            .dispatch(updateUserAttributes(mockAction))
            .run();
    });
});