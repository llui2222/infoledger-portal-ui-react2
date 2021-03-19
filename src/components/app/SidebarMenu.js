import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { Notifications, ExitToApp, AccountCircle, Menu, Group, EnhancedEncryption } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";

const drawerWidth = 240;

const menuItems = [
    {
        name: 'Notifications',
        url: '/',
        icon: Notifications,
    },
    {
        name: 'Profile',
        url: '/profile',
        icon: AccountCircle,
    },
    {
        name: 'Contacts',
        url: '/contacts',
        icon: Group,
    },
    {
        name: 'Encrypt Demo',
        url: '/crypto',
        icon: EnhancedEncryption,
    },
    {
        name: 'Log out',
        url: '/logout',
        icon: ExitToApp,
    },
]

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    paper: {
        background: '#474747',
        color: 'white',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    icon: {
        marginLeft: theme.spacing(1),
        color: 'white'
    }
}));

function Header() {

    const classes = useStyles();
    const history = useHistory();
    const authState = useSelector(state => state.user.authState);
    const [open, setOpen] = React.useState(false);

    const handleNavigate = url => {
        history.push(url);
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    if(authState !== AUTHORIZED_AUTH_STATE) {
        return null;
    }

    const renderIcon = (Icon) => {
        return <Icon className={classes.icon} />
    }

    return(
        <Drawer
            variant="permanent"
            className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
            classes={{
                paper: `${classes.paper} ${open ? classes.drawerOpen : classes.drawerClose}`,
            }}
        >
            <List>
                <ListItem button onClick={toggleDrawer}>
                    <ListItemIcon><Menu className={classes.icon} /></ListItemIcon>
                    <ListItemText primary={<Logo/>} />
                </ListItem>
                {menuItems.map((item) => (
                    <ListItem button key={item.url} onClick={() => handleNavigate(item.url)}>
                        <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Header;
