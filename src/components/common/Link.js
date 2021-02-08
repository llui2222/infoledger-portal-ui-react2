import React from "react";
import { Link as MuiLink } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";

function Link({ children, ...restProps}) {
    return (
        <MuiLink component={RouterLink} {...restProps}>
            {children}
        </MuiLink>
    );
}

export default Link;
