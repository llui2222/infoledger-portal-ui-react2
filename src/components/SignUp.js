import React, { useRef } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import {makeStyles} from "@material-ui/core/styles";
import {
    Container,
    FormControl,
    Box,
    Button,
    TextField,
} from '@material-ui/core';
import FieldPassword from "./common/FieldPassword";
import { useSnackbar } from 'notistack';
import {useDispatch} from "react-redux";
import {
    userRegisterRequest,
    userRegisterSuccess,
    userRegisterFailure
} from "../redux/reducers/usersReducer";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        height: `calc(100% - ${theme.spacing(7)}px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        width: 320
    },
    formFooter: {
        display: 'flex',
        marginTop: theme.spacing(1)
    },
    linkToLogin: {
        marginLeft: 'auto'
    }
}));

function SignUp() {

    const classes = useStyles();
    const password = useRef({});
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, watch, errors, setError } = useForm({
        mode: 'onChange'
    });

    password.current = watch('password', '');

    const onSubmit = data => {
        dispatch(userRegisterRequest());
        Auth.signUp({
            username: data.email,
            password: data.password
        }).then(() => {
            dispatch(userRegisterSuccess());
            history.push('/validateEmail');
        }).catch(err => {
            dispatch(userRegisterFailure());
            showErrorMessage(err.message);
        });
    }

    function showErrorMessage(text) {
        enqueueSnackbar(text, { variant: 'error' });
    }

    return (
        <Container maxWidth="sm" className={classes.pageContainer}>
            <FormControl
                component="form"
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
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
                        name: "email",
                        ref: register({ required: true })
                    }}
                    error={!!errors.email}
                    helperText={errors.email && <>This field is required</>}
                />

                <FieldPassword register={register} errors={errors} setError={setError} />

                <TextField
                    defaultValue=""
                    fullWidth
                    id="password2"
                    label="Confirm Password"
                    autoComplete="confirm-password"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    inputProps={{
                        name: "password2",
                        ref: register({
                            required: true,
                            validate: value => value === password.current
                        }),
                    }}
                    error={!!errors.password2}
                    helperText={errors.password2 && <>The passwords do not match</>}
                />

                <Box className={classes.formFooter}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        type="submit"
                        name="register"
                    >
                        Register
                    </Button>
                    <Link
                        to="/login"
                        className={classes.linkToLogin}
                        name="login"
                    >
                        Log In
                    </Link>
                </Box>
            </FormControl>
        </Container>
    );
}

export default SignUp;