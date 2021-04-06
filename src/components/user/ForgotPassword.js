import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import CenteredContainer from "../common/containers/CenteredContainer";
import {Button, FormControl, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {NOT_AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import {forgotPassword} from "../../redux/actions/user";
import LoginFormFooter from "./LoginFormFooter";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    }
}));

function ForgotPassword() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const authState = useSelector(state => state.user.authState);
    const [ email, setEmail ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    if(authState !== NOT_AUTHORIZED_AUTH_STATE) {
        return null;
    }

    return (
        <CenteredContainer>

            <FormControl
                className={classes.form}
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography variant="h3" gutterBottom>
                    Reset Password
                </Typography>

                <TextField
                    required
                    defaultValue=""
                    fullWidth
                    id="email-input"
                    label="Email"
                    autoComplete="email"
                    variant="outlined"
                    type="email"
                    margin="normal"
                    onChange={e => {
                        setEmail(e.currentTarget.value)
                    }}
                    inputProps={{
                        name: "userName",
                    }}
                />

                <LoginFormFooter
                    submitTitle='Reset Password'
                    secondaryTitle='Log In'
                    secondaryUrl='/login'
                />

            </FormControl>
        </CenteredContainer>
    );
}

export default ForgotPassword;
