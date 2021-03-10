import React from "react";
import {useIdleTimer} from "react-idle-timer";
import {useDispatch} from "react-redux";
import {LogOut as LogOutAction} from "../../redux/actions/user";
import * as infoLedgerSync from "../../redux/api/tabsSync";

function IdleTimer({ children }) {

    const dispatch = useDispatch();

    infoLedgerSync.channel.onmessage = message => {
        if(message.data === 'UserIsActive') {
            reset();
        }
    }

    const handleOnIdle = () => {
        dispatch(LogOutAction());
    }

    const handleOnAction = () => {
        infoLedgerSync.channel.postMessage('UserIsActive');
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
