import { SET_COMPANIES } from '../actions/company';

const initialState = {
    childCompanies: [],
    rootCompany: undefined,
    refetch: () => {}
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES: {
            const rootCompany = action.companies.find(company => {
                return company.parentProfileId === null;
            })
            const childCompanies = action.companies.filter(company => company.profileId !== rootCompany.profileId)
            return {...state, childCompanies: childCompanies, rootCompany: rootCompany, refetch: action.refetch}
        }
        default:
            return state;
    }
};

export default companiesReducer;