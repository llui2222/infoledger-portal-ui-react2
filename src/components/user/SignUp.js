import React, {useEffect, useRef} from 'react';
import {useForm} from "react-hook-form";
import {
    FormControl,
    Typography,
    TextField,
} from '@material-ui/core';
import PasswordHelper from "../common/PasswordHelper";
import {useDispatch, useSelector} from "react-redux";
import {userRegister} from "../../redux/actions/user";
import FieldPassword from "../common/FieldPassword";
import CenteredContainer from "../common/containers/CenteredContainer";
import LoginFormFooter from "./LoginFormFooter";
import {NOT_AUTHORIZED_AUTH_STATE} from "../../utils/constants";

function SignUp() {

    const dispatch = useDispatch();
    const password = useRef({});
    const authState = useSelector(state => state.user.authState);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    password.current = watch('password', '');

    const onSubmit = data => {
        dispatch(userRegister(data.userName, data.password));
    }

    if(authState !== NOT_AUTHORIZED_AUTH_STATE) {
        return null;
    }

    return (
        <CenteredContainer>
            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h3" gutterBottom>
                    Sign Up
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
                        ...register("userName", { required: true })
                    }}
                    error={!!errors.email}
                    helperText={errors.email && <>This field is required</>}
                />

                <PasswordHelper
                    required
                    register={register}
                    errors={errors}
                    margin='normal'
                    name='password'
                    label='Password'
                    defaultValue=''
                />

                <FieldPassword
                    required
                    register={register}
                    errors={errors}
                    margin='normal'
                    name='password2'
                    label='Confirm Password'
                    helperText='The passwords do not match'
                    labelWidth={142}
                    inputProps={{
                        ...register("password2", {
                            required: true,
                            validate: value => value === password.current
                        })
                    }}
                />

                <LoginFormFooter
                    submitTitle='Register'
                    secondaryTitle='Log In'
                    secondaryUrl='/login'
                />

            </FormControl>
        </CenteredContainer>
    );
}

export default SignUp;