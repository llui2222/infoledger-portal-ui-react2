export const ENCRYPT_REQUEST = 'ENCRYPT_REQUEST';
export const ENCRYPT_SUCCESS = 'ENCRYPT_SUCCESS';
export const ENCRYPT_FAILURE = 'ENCRYPT_FAILURE';
export const DECRYPT_REQUEST = 'DECRYPT_REQUEST';
export const DECRYPT_SUCCESS = 'DECRYPT_SUCCESS';
export const DECRYPT_FAILURE = 'DECRYPT_FAILURE';

export const encryptMessage = (message, context) => ({
    type: ENCRYPT_REQUEST,
    message,
    context
});

export const encryptMessageSuccess = encryptedMessage => ({
    type: ENCRYPT_SUCCESS,
    encryptedMessage
});

export const encryptMessageFailure = error => ({
    type: ENCRYPT_FAILURE,
    error
});

export const decryptMessage = (message, context) => ({
    type: DECRYPT_REQUEST,
    message,
    context
});

export const decryptMessageSuccess = decryptedMessage => ({
    type: DECRYPT_SUCCESS,
    decryptedMessage
});

export const decryptMessageFailure = error => ({
    type: DECRYPT_FAILURE,
    error
});