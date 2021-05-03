import {history} from "../index";

let channel;
try {
    channel = new BroadcastChannel('infoLedgerSync');
}  catch {
    notSupported();
}

export function init() {
    try {
        channel.onmessage = message => {
            switch (message.data) {
                case 'UserLoggedIn':
                    history.push('/');
                    break;
                case 'UserLoggedOut':
                    history.push('/login');
                    break;
                default:
                    break;
            }
        }
    } catch {
        notSupported();
    }
}

export function postMessage(message) {
    try {
        channel.postMessage(message);
    } catch {
        notSupported();
    }
}

export function onMessage(callback) {
    try {
        channel.onmessage = message => callback(message)
    } catch {
        notSupported();
    }
}

function notSupported() {
    // console.log('BroadcastChannel is not supported');
}