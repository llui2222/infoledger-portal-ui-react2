export const COMPANY_CREATE_REQUEST = 'COMPANY_CREATE_REQUEST';
export const COMPANY_CREATE_SUCCESS = 'COMPANY_CREATE_SUCCESS';
export const COMPANY_CREATE_FAILURE = 'COMPANY_CREATE_FAILURE';
export const SET_COMPANIES = 'SET_COMPANIES';

export const companyCreate = {
    type: COMPANY_CREATE_REQUEST
};

export const companyCreateSuccess = {
    type: COMPANY_CREATE_SUCCESS
}

export const companyCreateFailure = error => ({
    type: COMPANY_CREATE_FAILURE,
    error
});

export const setCompanies = (companies, refetch) => ({
    type: SET_COMPANIES,
    companies,
    refetch
});