import React, {useRef} from 'react';
import {useForm} from "react-hook-form";
import {
    FormControl,
    Typography,
    TextField,
} from '@material-ui/core';
import PasswordHelper from "../common/PasswordHelper";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword} from "../../redux/actions/user";
import FieldPassword from "../common/FieldPassword";
import CenteredContainer from "../common/containers/CenteredContainer";
import {NOT_AUTHORIZED_AUTH_STATE, USERNAME_TO_PASSWORD_RESET} from "../../utils/constants";
import { Redirect } from 'react-router-dom';
import LoginFormFooter from "./LoginFormFooter";

function SetNewPassword() {

    const dispatch = useDispatch();
    const password = useRef({});
    const authState = useSelector(state => state.user.authState);
    const userName = localStorage.getItem(USERNAME_TO_PASSWORD_RESET);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    password.current = watch('newPassword', '');

    const onSubmit = data => {
        dispatch(setNewPassword(userName, data.verificationCode, data.newPassword));
    }

    const onError = error => {
        console.log('error', error);
    }

    if(!userName || userName === 'undefined') {
        return <Redirect to='/forgot-password'/>
    }

    if(authState !== NOT_AUTHORIZED_AUTH_STATE) {
        return null;
    }

    return (
        <CenteredContainer>
            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Typography variant="h3" gutterBottom>
                    Set New Password
                </Typography>
                <TextField
                    required
                    defaultValue=""
                    fullWidth
                    id="verification-code"
                    label="Verification Code"
                    autoComplete="verification-code"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        ...register("verificationCode", { required: true })
                    }}
                    error={!!errors.verificationCode}
                    helperText={errors.verificationCode && <>This field is required</>}
                />

                <PasswordHelper
                    required
                    register={register}
                    errors={errors}
                    margin='normal'
                    name='newPassword'
                    label='New Password'
                    defaultValue=''
                    autoComplete="new-password"
                />

                <FieldPassword
                    required
                    register={register}
                    errors={errors}
                    margin='normal'
                    name='confirm-newPassword'
                    label='Confirm New Password'
                    helperText='The passwords do not match'
                    labelWidth={180}
                    autoComplete="new-password"
                    inputProps={{
                        ...register("confirm-password", { required: true })
                    }}
                />

                <LoginFormFooter
                    submitTitle='Set New Password'
                    secondaryTitle='Log In'
                    secondaryUrl='/login'
                />

            </FormControl>
        </CenteredContainer>
    );
}

export default SetNewPassword;
