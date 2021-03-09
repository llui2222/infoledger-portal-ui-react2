import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthorizedContainer from "./UnauthorizedContainer";
import {Box, Button, FormControl, TextField} from "@material-ui/core";
import FieldPassword from "../common/FieldPassword";
import LoginFormFooter from "./LoginFormFooter";
import {signIn} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm} from "react-hook-form";
import {NOT_AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import Link from "../common/Link";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    },
    forgotPassword: {
        marginTop: theme.spacing(4),
        marginRight: 'auto'
    }
}));

function Login() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const authState = useSelector(state => state.user.authState);

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange'
    });

    const onSubmit = data => {
        dispatch(signIn(data.userName, data.password));
    }

    if(authState !== NOT_AUTHORIZED_AUTH_STATE) {
        return null;
    }

    return (
        <UnauthorizedContainer>

            <EmailConfirmedMessage/>

            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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
                    inputProps={{
                        name: "userName",
                        ref: register({ required: true })
                    }}
                    error={!!errors.email}
                />

                <FieldPassword
                    required
                    name='password'
                    label='Password'
                    margin='normal'
                    inputProps={{
                        name: "password",
                        ref: register({ required: true })
                    }}
                />

                <LoginFormFooter
                    submitTitle='Log In'
                    secondaryTitle='Sign Up'
                    secondaryUrl='/sign-up'
                />

                <Link
                    to='/forgot-password'
                    className={classes.forgotPassword}
                    name="forgot-password"
                >
                    Forgot Password
                </Link>

            </FormControl>
        </UnauthorizedContainer>
    );
}

export default Login;
