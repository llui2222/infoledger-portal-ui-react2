import {
    CONFIRM_EMAIL_SUCCESS,
    IS_AUTHENTICATED_REQUEST,
    IS_AUTHENTICATED_SUCCESS,
    SIGN_IN_SUCCESS
} from '../actions/user';

const initialState = {
    userID: null,
    emailConfirmed: false,
    access: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_AUTHENTICATED_REQUEST:
            return { ...state, access: false }
        case IS_AUTHENTICATED_SUCCESS:
            return { ...state, access: true }
        case CONFIRM_EMAIL_SUCCESS:
            return { ...state, userID: null, emailConfirmed: true }
        case SIGN_IN_SUCCESS:
            return { ...state, emailConfirmed: false }
        default:
            return state;
    }
};

export default userReducer;