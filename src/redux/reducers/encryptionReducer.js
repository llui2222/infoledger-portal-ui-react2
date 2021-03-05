import {
    ENCRYPT_SUCCESS,
    DECRYPT_SUCCESS,
} from '../actions/encryption';

const initialState = {
    encryptedMessage: '',
    decryptedMessage: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENCRYPT_SUCCESS:
            return {...state, encryptedMessage: action.encryptedMessage}
        case DECRYPT_SUCCESS:
            return {...state, decryptedMessage: action.decryptedMessage}
        default:
            return state;
    }
};

export default userReducer;