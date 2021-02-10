import React from "react";
import {Typography} from '@material-ui/core';
import UnauthorizedContainer from "./user/UnauthorizedContainer";

function NotFound() {

    return (
        <UnauthorizedContainer>
            <Typography variant="h3" gutterBottom>
                Sorry, page not found!
            </Typography>
        </UnauthorizedContainer>
    );
}

export default NotFound;