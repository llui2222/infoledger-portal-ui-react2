export const USERNAME_TO_CONFIRM = 'USERNAME_TO_CONFIRM';
export const USERNAME_TO_PASSWORD_RESET = 'USERNAME_TO_PASSWORD_RESET';
export const PENDING_AUTH_STATE = 'PENDING_AUTH_STATE';
export const AUTHORIZED_AUTH_STATE = 'AUTHORIZED_AUTH_STATE';
export const NOT_AUTHORIZED_AUTH_STATE = 'NOT_AUTHORIZED_AUTH_STATE';

export const routesNotAuthorizedOnly = [
    '/login', '/sign-up', '/confirm-email', '/forgot-password', '/set-new-password'
];

export const fieldsRequired = [
    'family_name', 'name'
];