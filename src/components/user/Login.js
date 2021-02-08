import React from "react";
import Typography from '@material-ui/core/Typography';
import UnauthorizedContainer from "./UnauthorizedContainer";
import {Link} from "react-router-dom";

function Login() {

    return (
        <UnauthorizedContainer>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Link to="/signup">
                Sign Up
            </Link>
        </UnauthorizedContainer>
    );
}

export default Login;
