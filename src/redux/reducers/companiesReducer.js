import { SET_COMPANIES } from '../actions/company';

const initialState = {
    companies: [],
    rootCompany: undefined
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES: {
            const rootCompany = action.companies.find(company => {
                return company.parentProfileId === null;
            })
            return {...state, companies: action.companies, rootCompany: rootCompany}
        }
        default:
            return state;
    }
};

export default companiesReducer;