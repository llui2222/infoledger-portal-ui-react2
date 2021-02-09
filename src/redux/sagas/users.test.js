import {
    workerUserRegister,
    workerUserRegisterSuccess
} from "./users";
import {runSaga} from 'redux-saga';
import {userRegisterFailure, userRegisterSuccess} from "../actions/users";
import * as api from '../api/auth';
import { history } from "../index";

describe('workerUserRegister', () => {
    it('should call api and dispatch success action', async () => {
        const dispatched = [];

        const regResponseMock = {
            user: {
                username: "test@test.test",
            },
        };

        const userRegister = jest.spyOn(api, 'userRegister')
            .mockImplementation(() => Promise.resolve(regResponseMock));

        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, workerUserRegister);

        expect(userRegister).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([userRegisterSuccess(regResponseMock.user.username)]);
        userRegister.mockClear();
    });
    it('should redirect on success', () => {
        const push = jest.spyOn(history, 'push')
            .mockImplementation(() => {});
        const gen = workerUserRegisterSuccess();
        gen.next();
        expect(push).toHaveBeenCalledWith('/confirmEmail');
    });
    it('should dispatch failure action on reject', async () => {
        const dispatched = [];
        const error = new Error('Error message');
        const errorMock = () => {
            throw error;
        }

        const userRegister = jest.spyOn(api, 'userRegister')
            .mockImplementation(errorMock);

        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, workerUserRegister);

        expect(userRegister).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([userRegisterFailure(error)]);
        userRegister.mockClear();
    });
});