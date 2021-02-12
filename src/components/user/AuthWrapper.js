import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../redux";
import {isAuthenticated} from "../../redux/actions/user";

const AuthWrapper = ({ children }) => {

    const dispatch = useDispatch();
    const pathname = useSelector(state => state.router.location.pathname);

    useEffect( () => {
        dispatch(isAuthenticated(history.location.pathname));
    }, [pathname])

    return children;
}

export default AuthWrapper;