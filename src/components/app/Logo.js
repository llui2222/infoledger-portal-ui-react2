import React from "react";
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SIDEBAR_WIDTH } from "../../constants"

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'block',
        width: SIDEBAR_WIDTH,
        lineHeight: '56px',
        color: 'white',
        fontSize: '27px',
        paddingLeft: 18,
        textDecoration: 'none'
    }
}));

function Logo() {

    const classes = useStyles();

    return (
        <Typography variant="h4">
            <Link to="/" className={classes.logo}>
                Info Ledger
            </Link>
        </Typography>
    );
}

export default Logo;
