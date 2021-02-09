import React, { useState, useEffect } from "react";
import {TextField, Typography, FormControl, Button} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch, useSelector} from 'react-redux';
import {CONFIRM_EMAIL_REQUEST} from "../../redux/actions/users";
import UnauthorizedContainer from "./UnauthorizedContainer";
import {history} from "../../redux";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: theme.spacing(4)
    },
    confirmationCodeField: {
        marginRight: theme.spacing(1)
    }
}));

function ConfirmEmail() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [ confirmationCode, setConfirmationCode ] = useState('');
    const userID = useSelector(state => state.users.userID);

    useEffect(() => {
        if(!userID) history.push('/sign-up');
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: CONFIRM_EMAIL_REQUEST,
            userName: userID,
            confirmationCode: confirmationCode
        });
    }

    return (
        <UnauthorizedContainer>
            <Typography variant="h4" gutterBottom>
                You have been successfully registered
            </Typography>
            <Typography variant="subtitle1">
                Please check your email and enter conformation code below
            </Typography>
            <FormControl
                component="form"
                className={classes.form}
                onSubmit={e => handleSubmit(e)}
            >
                <TextField
                    label="Confirmation Code"
                    variant="outlined"
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                    className={classes.confirmationCodeField}
                />
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    type="submit"
                    name="verify"
                >
                    Verify Email
                </Button>
            </FormControl>
        </UnauthorizedContainer>
    );
}

export default ConfirmEmail;
