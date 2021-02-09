import React from "react";
import {Typography} from '@material-ui/core';
import PageContainer from "./PageContainer";

function NotFound() {

    return (
        <PageContainer>
            <Typography variant="h3" gutterBottom>
                Sorry, page not found!
            </Typography>
        </PageContainer>
    );
}

export default NotFound;
