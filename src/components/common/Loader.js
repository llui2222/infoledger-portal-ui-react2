import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from '@material-ui/core';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 9999,
        color: '#fff',
    },
}));

function Loader() {

    const classes = useStyles();
    const requests = useSelector(state => state.requests);
    const open = Object.values(requests).some(item => item === true);

    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;
