export const COMPANY_CREATE_REQUEST = 'COMPANY_CREATE_REQUEST';
export const COMPANY_CREATE_SUCCESS = 'COMPANY_CREATE_SUCCESS';
export const COMPANY_CREATE_FAILURE = 'COMPANY_CREATE_FAILURE';

export const companyCreate = (profileName, profileType, typeOfBusiness, businessAddress, postalCode) => ({
    type: COMPANY_CREATE_REQUEST,
    profileName,
    profileType,
    typeOfBusiness,
    businessAddress,
    postalCode
});

export const companyCreateSuccess = data => ({
    type: COMPANY_CREATE_SUCCESS,
    data
});

export const companyCreateFailure = error => ({
    type: COMPANY_CREATE_FAILURE,
    error
});