import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthorizedContainer from "./UnauthorizedContainer";
import {FormControl, TextField} from "@material-ui/core";
import FieldPassword from "../common/FieldPassword";
import LoginFormFooter from "./LoginFormFooter";
import {makeStyles} from "@material-ui/core/styles";
import {USER_REGISTER_REQUEST} from "../../redux/actions/users";
import {useDispatch} from "react-redux";
import PasswordHelper from "../common/PasswordHelper";

const useStyles = makeStyles((theme) => ({
}));

function Login() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch({
            type: USER_REGISTER_REQUEST,
            email: data.email,
            password: data.password
        });
    }

    return (
        <UnauthorizedContainer>
            <FormControl
                component="form"
                onSubmit={onSubmit}
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
