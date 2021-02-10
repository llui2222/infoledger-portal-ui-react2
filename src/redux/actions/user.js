export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const IS_AUTHENTICATED_REQUEST = 'IS_AUTHENTICATED_REQUEST';
export const IS_AUTHENTICATED_SUCCESS = 'IS_AUTHENTICATED_SUCCESS';
export const IS_AUTHENTICATED_FAILURE = 'IS_AUTHENTICATED_FAILURE';

export const userRegister = (userName, password) => ({
    type: USER_REGISTER_REQUEST,
    userName,
    password
});

export const userRegisterSuccess = userName => ({
    type: USER_REGISTER_SUCCESS,
    userName
});

export const userRegisterFailure = error => ({
    type: USER_REGISTER_FAILURE,
    error
});

export const confirmEmail = (userName, confirmationCode) => ({
    type: CONFIRM_EMAIL_REQUEST,
    userName,
    confirmationCode
});

export const confirmEmailSuccess = () => ({
    type: CONFIRM_EMAIL_SUCCESS
});

export const confirmEmailFailure = error => ({
    type: CONFIRM_EMAIL_FAILURE,
    error
});

export const signIn = (userName, password) => ({
    type: SIGN_IN_REQUEST,
    userName,
    password
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS
});

export const signInFailure = error => ({
    type: SIGN_IN_FAILURE,
    error
});

export const isAuthenticated = path => ({
    type: IS_AUTHENTICATED_REQUEST,
    path: path
});

export const isAuthenticatedSuccess = currentUser => ({
    type: IS_AUTHENTICATED_SUCCESS,
    isAuthenticated: true
});

export const isAuthenticatedFailure = error => ({
    type: IS_AUTHENTICATED_FAILURE,
    isAuthenticated: false
});