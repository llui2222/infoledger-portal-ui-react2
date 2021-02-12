import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {LogOut as LogOutAction} from "../../redux/actions/user";

function LogOut() {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(LogOutAction());
    }, [])

    return null;
}

export default LogOut;
