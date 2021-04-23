import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import {gql, useQuery} from "@apollo/client";
import {allProfiles} from "../../graphql/queries";
import ServiceCompanySidebar from "../company/ServiceCompanySidebar";
import {showNotification} from "../../redux/actions/notifications";
import {setCompanies} from "../../redux/actions/company";

const ProtectedRoute = ({children, ...rest}) => {

    const dispatch = useDispatch();
    const authState = useSelector(state => state.user.authState);
    const history = useHistory();
    const {loading, error, data, refetch} = useQuery(gql(allProfiles));

    useEffect(() => {
        if (authState === AUTHORIZED_AUTH_STATE && data && data.allProfiles) {
            dispatch(setCompanies(data.allProfiles, refetch));
            if (!data.allProfiles.length || !data.allProfiles[0]) {
                history.push('/create-company')
            }
        }
    }, [data, authState])


    if (error) {
        dispatch(showNotification({
            message: error.message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error'
            },
        }))
        return null;
    }

    return (
        <Route {...rest}>

            {loading ?
                null
                :
                (!data || authState !== AUTHORIZED_AUTH_STATE) ?
                    null
                    :
                    <>
                        <ServiceCompanySidebar/>
                        {children}
                    </>
            }
        </Route>
    )
}

export default ProtectedRoute;