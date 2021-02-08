import React from "react";
import {Box, Button} from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formFooter: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    linkToLogin: {
        marginLeft: 'auto',
        fontSize: '18px',
        '&::visited': {
            color: theme.palette.primary
        }
    }
}));

function LoginFormFooter({ submitTitle, secondaryTitle, secondaryUrl }) {

    const classes = useStyles();

    return (
        <Box className={classes.formFooter}>
            <Button
                variant="contained"
                size="large"
                color="primary"
                disableElevation
                type="submit"
                name="register"
            >
                { submitTitle }
            </Button>
            <Link
                to={secondaryUrl}
                className={classes.linkToLogin}
                name="sign-up"
            >
                {secondaryTitle}
            </Link>
        </Box>
    );
}

export default LoginFormFooter;
