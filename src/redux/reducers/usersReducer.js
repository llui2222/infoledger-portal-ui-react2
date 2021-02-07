import { USER_REGISTER_SUCCESS } from '../actions/users';

const initialState = {
    userID: ''
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_REGISTER_SUCCESS:
            return { ...state, userID: action.user }
        default:
            return state;
    }
};

export default usersReducer;

