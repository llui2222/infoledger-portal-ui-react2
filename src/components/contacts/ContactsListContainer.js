import React, { useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { listContacts } from "../../graphql/queries";
import {showNotification} from "../../redux/actions/notifications";
import {useDispatch} from "react-redux";
import ContactsList from "./ContactsList";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    loader: {
        margin: `${theme.spacing(10)}px auto 0`
    },
}));

function Contacts() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(gql(listContacts));

    useEffect(() => {
        if(error) {

            dispatch(
                showNotification({
                    message: error.message,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error'
                    },
                })
            );
        }
    }, [error])

    if(loading) {
        return <CircularProgress className={classes.loader} color="inherit" />
    }

    if(data) {
        return <ContactsList contacts={data.listContacts.items}/>;
    } else {
        return null;
    }
}

export default Contacts;