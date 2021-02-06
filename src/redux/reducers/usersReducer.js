export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
const initialState = {}

const usersReducer = (state = initialState, action) => {
    return state;
};

export const userRegisterRequest = () => ({
    type: USER_REGISTER_REQUEST
});

export const userRegisterSuccess = () => ({
    type: USER_REGISTER_SUCCESS
});

export const userRegisterFailure = () => ({
    type: USER_REGISTER_FAILURE
});

export default usersReducer;

