import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from "./Router";
import Loader from "../common/Loader";
import Notifier from "./Notifier";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%'
    },
}));

function Header() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router/>
            <Loader/>
            <Notifier/>
        </div>
    );
}

export default Header;
