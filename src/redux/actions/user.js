export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const CONFIRM_CHANGED_EMAIL_REQUEST = 'CONFIRM_CHANGED_EMAIL_REQUEST';
export const CONFIRM_CHANGED_EMAIL_SUCCESS = 'CONFIRM_CHANGED_EMAIL_SUCCESS';
export const CONFIRM_CHANGED_EMAIL_FAILURE = 'CONFIRM_CHANGED_EMAIL_FAILURE';
export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const IS_AUTHENTICATED_REQUEST = 'IS_AUTHENTICATED_REQUEST';
export const IS_AUTHENTICATED_SUCCESS = 'IS_AUTHENTICATED_SUCCESS';
export const IS_AUTHENTICATED_FAILURE = 'IS_AUTHENTICATED_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const UPDATE_USER_ATTRIBUTES_REQUEST = 'UPDATE_USER_ATTRIBUTES_REQUEST';
export const UPDATE_USER_ATTRIBUTES_SUCCESS = 'UPDATE_USER_ATTRIBUTES_SUCCESS';
export const UPDATE_USER_ATTRIBUTES_FAILURE = 'UPDATE_USER_ATTRIBUTES_FAILURE';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILURE = 'SET_NEW_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

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

export const confirmChangedEmail = (payload) => ({
    type: CONFIRM_CHANGED_EMAIL_REQUEST,
    payload
});

export const confirmChangedEmailSuccess = () => ({
    type: CONFIRM_CHANGED_EMAIL_SUCCESS
});

export const confirmChangedEmailFailure = error => ({
    type: CONFIRM_CHANGED_EMAIL_FAILURE,
    error
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

export const isAuthenticatedSuccess = user => ({
    type: IS_AUTHENTICATED_SUCCESS,
    user
});

export const isAuthenticatedFailure = error => ({
    type: IS_AUTHENTICATED_FAILURE,
    error
});

export const LogOut = () => ({
    type: LOG_OUT_REQUEST
});

export const LogOutSuccess = () => ({
    type: LOG_OUT_SUCCESS
});

export const LogOutFailure = error => ({
    type: LOG_OUT_FAILURE,
    error
});

export const updateUserAttributes = (payload) => ({
    type: UPDATE_USER_ATTRIBUTES_REQUEST,
    payload
});

export const updateUserAttributesSuccess = () => ({
    type: UPDATE_USER_ATTRIBUTES_SUCCESS
});

export const updateUserAttributesFailure = error => ({
    type: UPDATE_USER_ATTRIBUTES_FAILURE,
    error
});

export const forgotPassword = (userName) => ({
    type: FORGOT_PASSWORD_REQUEST,
    userName,
});

export const forgotPasswordSuccess = () => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailure = error => ({
    type: FORGOT_PASSWORD_FAILURE,
    error
});

export const setNewPassword = (userName, verificationCode, newPassword) => ({
    type: SET_NEW_PASSWORD_REQUEST,
    userName,
    verificationCode,
    newPassword
});

export const setNewPasswordSuccess = () => ({
    type: SET_NEW_PASSWORD_SUCCESS
});

export const setNewPasswordFailure = error => ({
    type: SET_NEW_PASSWORD_FAILURE,
    error
});

export const changePassword = payload => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload
});

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = error => ({
    type: CHANGE_PASSWORD_FAILURE,
    error
});