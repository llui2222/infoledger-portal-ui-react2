import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import {
    Container,
    FormControl,
    Box,
    Button,
    TextField,
} from '@material-ui/core';
import PasswordHelper from "../common/PasswordHelper";
import {useDispatch} from "react-redux";
import {
    USER_REGISTER_REQUEST
} from "../../redux/actions/users";
import FieldPassword from "../common/FieldPassword";

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
    const dispatch = useDispatch();
    const password = useRef({});

    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange'
    });

    password.current = watch('password', '');

    const onSubmit = data => {
        dispatch({
            type: USER_REGISTER_REQUEST,
            email: data.email,
            password: data.password
        });
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

                <PasswordHelper
                    register={register}
                    errors={errors}
                    name='password'
                    label='Password'
                />

                <FieldPassword
                    register={register}
                    errors={errors}
                    name='password2'
                    label='Confirm Password'
                    helperText={errors.password2 && <>The passwords do not match</>}
                    labelWidth={132}
                    registerRule={{
                        required: true,
                        validate: value => value === password.current
                    }}
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