import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthorizedContainer from "./UnauthorizedContainer";
import {FormControl, TextField} from "@material-ui/core";
import FieldPassword from "../common/FieldPassword";
import LoginFormFooter from "./LoginFormFooter";
import {USER_REGISTER_REQUEST} from "../../redux/actions/users";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    }
}));

function Login() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const onSubmit = data => {
        dispatch({
            type: USER_REGISTER_REQUEST,
            email: data.email,
            password: data.password
        });
    }

    return (
        <UnauthorizedContainer>

            <EmailConfirmedMessage/>

            <FormControl
                component="form"
                onSubmit={onSubmit}
                className={classes.form}
            >
                <Typography variant="h3" gutterBottom>
                    Log In
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
                />

                <FieldPassword
                    required
                    name='password'
                    label='Password'
                    margin='normal'
                />

                <LoginFormFooter
                    submitTitle='Log In'
                    secondaryTitle='Sign Up'
                    secondaryUrl='/sign-up'
                />

            </FormControl>
        </UnauthorizedContainer>
    );
}

export default Login;
