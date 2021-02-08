import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    message: {
        marginTop: theme.spacing(6)
    }
}));

function EmailConfirmedMessage() {

    const classes = useStyles();
    const emailConfirmed = useSelector(state => state.users.emailConfirmed);

    if (!emailConfirmed) {
        return null;
    }

    return (
        <Alert severity="success" className={classes.message}>
            <AlertTitle>Your email successfully confirmed</AlertTitle>
            Now you can log in with your credentials
        </Alert>
    );
}

export default EmailConfirmedMessage;
