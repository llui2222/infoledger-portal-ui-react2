import React, { useState, useEffect } from "react";
import {TextField, Typography, FormControl, Button} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux';
import {confirmEmail} from "../../redux/actions/user";
import CenteredContainer from "../common/containers/CenteredContainer";
import {history} from "../../redux";
import {USERNAME_TO_CONFIRM} from "../../utils/constants";

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
    const userName = localStorage.getItem(USERNAME_TO_CONFIRM);

    useEffect(() => {
        if(!userName) history.push('/sign-up');
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(confirmEmail(userName, confirmationCode));
    }

    return (
        <CenteredContainer>
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
        </CenteredContainer>
    );
}

export default ConfirmEmail;
