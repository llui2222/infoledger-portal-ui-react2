import {
    CONFIRM_EMAIL_SUCCESS,
    IS_AUTHENTICATED_REQUEST,
    IS_AUTHENTICATED_SUCCESS,
    IS_AUTHENTICATED_FAILURE,
    SIGN_IN_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    SET_CURRENT_USER,
    SET_USER_MFA,
} from '../actions/user';

import {
    PENDING_AUTH_STATE,
    AUTHORIZED_AUTH_STATE,
    NOT_AUTHORIZED_AUTH_STATE
} from "../../utils/constants";

const initialState = {
    emailConfirmed: false,
    authState: PENDING_AUTH_STATE,
    user: null,
    userMfa: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTHENTICATED_REQUEST:
            return {...state, authState: PENDING_AUTH_STATE}
        case IS_AUTHENTICATED_SUCCESS:
            return {...state, authState: AUTHORIZED_AUTH_STATE}
        case IS_AUTHENTICATED_FAILURE:
            return {...state, authState: NOT_AUTHORIZED_AUTH_STATE}
        case CONFIRM_EMAIL_SUCCESS:
        case FORGOT_PASSWORD_SUCCESS:
            return {...state, emailConfirmed: true}
        case SIGN_IN_SUCCESS:
            return {...state, emailConfirmed: false, authState: AUTHORIZED_AUTH_STATE}
        case SET_CURRENT_USER:
            return {...state, user: action.userData}
        case SET_USER_MFA:
            return {...state, userMfa: action.userMfa}
        default:
            return state;
    }
};

export default userReducer;