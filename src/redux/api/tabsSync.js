import {history} from "../index";

export const channel = new BroadcastChannel('infoLedgerSync');

export function init() {
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
}