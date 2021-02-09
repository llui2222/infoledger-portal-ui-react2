export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

export const userRegisterSuccess = username => ({
    type: USER_REGISTER_SUCCESS,
    user: username
});

export const userRegisterFailure = (error) => ({
    type: USER_REGISTER_FAILURE,
    error: error
});

export const confirmEmailSuccess = () => ({
    type: CONFIRM_EMAIL_SUCCESS
});

export const confirmEmailFailure = () => ({
    type: CONFIRM_EMAIL_FAILURE
});