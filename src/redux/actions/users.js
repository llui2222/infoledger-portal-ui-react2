export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const userRegisterSuccess = username => ({
    type: USER_REGISTER_SUCCESS,
    user: username
});

export const userRegisterFailure = error => ({
    type: USER_REGISTER_FAILURE,
    error: error
});

export const confirmEmailSuccess = () => ({
    type: CONFIRM_EMAIL_SUCCESS
});

export const confirmEmailFailure = error => ({
    type: CONFIRM_EMAIL_FAILURE,
    error: error
});

export const signInSuccess = token => ({
    type: SIGN_IN_SUCCESS,
    token: token
});

export const signInFailure = error => ({
    type: SIGN_IN_FAILURE,
    error: error
});