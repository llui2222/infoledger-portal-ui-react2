import React from "react";
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SIDEBAR_WIDTH } from "../../constants"

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'block',
        height: 48,
        lineHeight: '48px',
        color: 'white',
        fontSize: '21px',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
}));

function Logo() {

    const classes = useStyles();

    return (
        <Typography variant="h4" className={classes.logo}>
            Info Ledger
        </Typography>
    );
}

export default Logo;
