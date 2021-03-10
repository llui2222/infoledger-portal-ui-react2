import React from "react";
import {useIdleTimer} from "react-idle-timer";
import {useDispatch} from "react-redux";
import {LogOut as LogOutAction} from "../../redux/actions/user";

function IdleTimer({ children }) {

    const dispatch = useDispatch();
    const channel = new BroadcastChannel('infoLedgerSync');

    channel.onmessage = message => {
        if(message.data === 'UserIsActive') {
            reset();
        }
    }

    const handleOnIdle = () => {
        dispatch(LogOutAction());
    }

    const handleOnAction = () => {
        channel.postMessage('UserIsActive');
    }

    const { reset } = useIdleTimer({
        timeout: 1000 * 60 * 60 * 2,
        onIdle: handleOnIdle,
        onAction: handleOnAction,
        eventsThrottle: 1000
    })

    return children;
}

export default IdleTimer;
