import React from "react";
import {
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core';
import { Today, ExitToApp, AccountCircle } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";

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
    const authState = useSelector(state => state.user.authState);

    const handleChange = (event, value) => {
        history.push(value);
    }

    if(authState !== AUTHORIZED_AUTH_STATE) {
        return null;
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
                    label="Profile"
                    icon={<AccountCircle />}
                    value='/profile'
                />
                <BottomNavigationAction
                    className={classes.iconButton}
                    label="Log out"
                    icon={<ExitToApp />}
                    value='/logout'
                />
            </BottomNavigation>
        </div>
    );
}

export default Header;
