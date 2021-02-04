import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthContainer from "./UnauthContainer";
import {Link} from "react-router-dom";

function Login() {

    return (
        <UnauthContainer>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Link to="/signup">
                Sign Up
            </Link>
        </UnauthContainer>
    );
}

export default Login;
