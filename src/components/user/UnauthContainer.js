import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '40px 8%',
    },
}));

function UnauthContainer(props) {

    const classes = useStyles();

    return (
        <Box className={classes.page}>
            {props.children}
        </Box>
    );
}

export default UnauthContainer;
