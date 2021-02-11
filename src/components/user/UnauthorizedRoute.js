import React from "react";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {NOT_AUTHORIZED_AUTH_STATE} from "../../utils/constants";

const UnauthorizedRoute = ({children, ...rest}) => {

    const authState = useSelector(state => state.user.authState);

    return (
        <Route {...rest}>
            {authState === NOT_AUTHORIZED_AUTH_STATE ? children: null }
        </Route>
    )
}

export default UnauthorizedRoute;