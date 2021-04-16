import React, {useEffect} from "react";
import {Route, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import {gql, useQuery} from "@apollo/client";
import {allProfiles} from "../../graphql/queries";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SidebarMenu from "../app/SidebarMenu";
import {showNotification} from "../../redux/actions/notifications";
import {setCompanies} from "../../redux/actions/company";

const useStyles = makeStyles((theme) => ({
    loader: {
        margin: `${theme.spacing(10)}px auto 0`
    },
}));

const ProtectedRoute = ({children, ...rest}) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const authState = useSelector(state => state.user.authState);
    const history = useHistory();
    const {loading, error, data} = useQuery(gql(allProfiles));

    useEffect(() => {
        if (data) {
            dispatch(setCompanies(data.allProfiles));
            if (!data.allProfiles.length) {
                history.push('/company/create')
            }
        }
    }, [data])


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
                <CircularProgress className={classes.loader} color="inherit"/>
                :
                (!data || authState !== AUTHORIZED_AUTH_STATE) ?
                    null
                    :
                    <>
                        <SidebarMenu/>
                        {children}
                    </>
            }
        </Route>
    )
}

export default ProtectedRoute;