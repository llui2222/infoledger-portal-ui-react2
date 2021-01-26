import React from "react";
import {
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core';
import { Today, AccountCircle } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#474747',
        display: 'flex'
    },
    headerMenu: {
        background: '#474747',
        flex: 1
    },
    iconButton: {
        color: 'white'
    }
}));

function Header() {

    const classes = useStyles();
    const history = useHistory();

    const handleChange = (event, value) => {
        history.push(value);
    }

    return (
        <div className={classes.root}>
            <Logo/>
            <BottomNavigation
                showLabels
                className={classes.headerMenu}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    className={classes.iconButton}
                    label="Dashboard"
                    icon={<Today />}
                    value='/'
                />
                <BottomNavigationAction
                    className={classes.iconButton}
                    label="Login"
                    icon={<AccountCircle />}
                    value='/login'
                />
            </BottomNavigation>
        </div>
    );
}

export default Header;
