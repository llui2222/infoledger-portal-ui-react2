import { SET_COMPANIES } from '../actions/company';

const initialState = {
    companies: [],
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return {...state, companies: action.companies}
        default:
            return state;
    }
};

export default companiesReducer;