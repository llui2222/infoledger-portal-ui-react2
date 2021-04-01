import React from "react";
import {Typography} from '@material-ui/core';
import CenteredContainer from "./common/containers/CenteredContainer";

function NotFound() {

    return (
        <CenteredContainer>
            <Typography variant="h3" gutterBottom>
                Sorry, page not found!
            </Typography>
        </CenteredContainer>
    );
}

export default NotFound;