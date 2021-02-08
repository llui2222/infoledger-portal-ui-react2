import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        height: `calc(100% - ${theme.spacing(7)}px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    page: {
        minWidth: 600,
        textAlign: 'center',
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
