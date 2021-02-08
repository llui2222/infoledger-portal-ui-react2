import {workerUserRegister} from "./users";
import {runSaga} from 'redux-saga';
import {userRegisterSuccess} from "../actions/users";
import * as api from '../api/auth';


describe('workerUserRegister', () => {
    it('should call api and dispatch success action', async () => {

        const regResponseMock = {
            user: {
                username: "test@test.test",
            },
        };
        const dispatched = [];

        const userRegister = jest.spyOn(api, 'userRegister')
            .mockImplementation(() => Promise.resolve(regResponseMock));

        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, workerUserRegister);

        expect(userRegister).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([userRegisterSuccess(regResponseMock.user.username)]);
        userRegister.mockClear();
    });
});