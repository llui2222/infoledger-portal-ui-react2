import React, { useEffect } from "react";
import {Route, Redirect} from "react-router-dom";
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
    const { loading, error, data } = useQuery(gql(allProfiles));

    useEffect(() => {
        if(data) {
            dispatch(setCompanies(data.allProfiles));
        }
    }, [data])

    if(error) {
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
            { loading && <CircularProgress className={classes.loader} color="inherit" />}
            {!loading && (authState === AUTHORIZED_AUTH_STATE ?
                (
                    <>
                        { data.allProfiles.length === 0 ?
                            <Redirect to='/company/create'/>
                        :
                            <SidebarMenu/>
                        }
                        {children}
                    </>
                ) : null)}
        </Route>
    )
}

export default ProtectedRoute;