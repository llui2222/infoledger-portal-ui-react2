import {put} from 'redux-saga/effects';
import {showNotification} from "../actions/notifications";

function showErrorMessage(message) {
    return put(showNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error'
        },
    }));
}

export function* workerFailure(action) {
    if(action && action.error && action.error.message) {
        yield showErrorMessage(action.error.message);
    }
}