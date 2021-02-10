import React, {useEffect} from "react";
import { Route } from "react-router-dom";
import {useDispatch} from "react-redux";
import {isAuthenticated} from "../../redux/actions/user";
import {useSelector} from "react-redux";

const ProtectedRoute = ({ children, path, ...rest }) => {

    const dispatch = useDispatch();
    const access = useSelector(state => state.user.access)

    useEffect( () => {
        dispatch(isAuthenticated(path));
    }, [])

    return (
        <Route {...rest}>
            { access ? children : null }
        </Route>
    )
}

export default ProtectedRoute;