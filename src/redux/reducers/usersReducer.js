import { USER_REGISTER_SUCCESS, CONFIRM_EMAIL_SUCCESS } from '../actions/users';

const initialState = {
    userID: null,
    emailConfirmed: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_REGISTER_SUCCESS:
            return { ...state, userID: action.user }
        case CONFIRM_EMAIL_SUCCESS:
            return { ...state, userID: null, emailConfirmed: true }
        default:
            return state;
    }
};

export default usersReducer;