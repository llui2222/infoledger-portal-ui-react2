import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        minHeight: '100%'
    },
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        height: '100%'
    },
}));

function UnauthorizedContainer(props) {

    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.pageContainer}>
            <Box className={classes.page}>
                {props.children}
            </Box>
        </Container>
    );
}

export default UnauthorizedContainer;
