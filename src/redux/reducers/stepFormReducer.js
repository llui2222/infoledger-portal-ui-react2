import {
    NEXT,
    SET_STEP,
    NEXT_STEP,
    PREVIOUS_STEP,
    SET_ALL_STEPS,
    RESET,
} from '../actions/stepForm';

const initialState = {
    allSteps: [],
    step: 0,
    next: 0
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT:
            return {...state, next: state.next+1}
        case SET_STEP:
            return {...state, step: action.step}
        case NEXT_STEP:
            return {...state, step: state.step+1}
        case PREVIOUS_STEP:
            return {...state, step: state.step-1}
        case SET_ALL_STEPS:
            return {...state, allSteps: action.allSteps}
        case RESET:
            return {...initialState}
        default:
            return state;
    }
};

export default userReducer;