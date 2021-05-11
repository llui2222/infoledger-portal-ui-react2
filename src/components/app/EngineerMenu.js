import React from "react";
import {Divider, Box} from '@material-ui/core';
import SidebarMenuItem from "./SidebarMenuItem";
import {
    AccountCircle,
    EnhancedEncryption,
    Business,
    ExitToApp,
    Description,
} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";

const menuItems = [
    {
        name: 'Encrypt Demo',
        url: '/crypto',
        icon: EnhancedEncryption,
    },
    {
        name: 'Company',
        url: '/create-company',
        icon: Business,
    },
    {
        name: 'Doc',
        url: '/investment/document',
        icon: Description,
    },
    {
        name: 'Log out',
        url: '/logout',
        icon: ExitToApp,
    },
]

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
        },
    },
    engineerMenu: {
        marginTop: theme.spacing(20)
    }
}));

function EngineerMenu() {

    const classes = useStyles();
    const location = useLocation();

    const renderIcon = (Icon) => {
        return <Icon className={classes.icon} />
    }

    const isLocalEnv = () => {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    if(!isLocalEnv) {
        return null;
    }

    return (
        <Box className={classes.engineerMenu}>
            <Divider />
            {menuItems.map((menuItem) =>
                <SidebarMenuItem
                    url={menuItem.url}
                    text={menuItem.name}
                    key={menuItem.name}
                >
                    {renderIcon(menuItem.icon)}
                </SidebarMenuItem>
            )}
        </Box>
    )
}

export default EngineerMenu;
