import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthorizedContainer from "./UnauthorizedContainer";
import {FormControl, TextField} from "@material-ui/core";
import FieldPassword from "../common/FieldPassword";
import LoginFormFooter from "./LoginFormFooter";
import {signIn} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    }
}));

function Login() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange'
    });

    const onSubmit = data => {
        dispatch(signIn(data.userName, data.password));
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

            </FormControl>
        </UnauthorizedContainer>
    );
}

export default Login;
