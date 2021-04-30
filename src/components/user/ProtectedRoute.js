import React, {useEffect} from "react";
import {Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import {gql, useQuery} from "@apollo/client";
import {allProfiles} from "../../graphql/queries";
import ServiceCompanySidebar from "../company/ServiceCompanySidebar";
import {showNotification} from "../../redux/actions/notifications";
import {setCompanies} from "../../redux/actions/company";
import {fieldsRequired} from "../../utils/constants";
import {currentAuthenticatedUser} from "../../redux/api/auth";

const ProtectedRoute = ({children, ...rest}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const authState = user.authState;
    const location = useLocation();
    const history = useHistory();
    const {loading, error, data, refetch} = useQuery(gql(allProfiles));

    useEffect(() => {
        if (authState === AUTHORIZED_AUTH_STATE && data && data.allProfiles) {
            dispatch(setCompanies(data.allProfiles, refetch));

            let profileComplete = true;

            currentAuthenticatedUser().then(user => {
                fieldsRequired.map(attr => {
                    if(!user.attributes[attr]) {
                        profileComplete = false;
                    }
                })

                if(!profileComplete) {
                    if(location.pathname !== '/profile') {
                        history.push('/profile');
                    }
                } else if(!data.allProfiles.length || !data.allProfiles[0]) {
                    if(location.pathname !== '/create-company') {
                        history.push('/create-company');
                    }
                }
            })
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