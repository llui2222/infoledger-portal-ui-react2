import React, {useState} from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from '@material-ui/core';
import { Notifications, Menu } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import {useHistory, useLocation} from 'react-router-dom';
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";

const drawerWidth = 240;

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
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
        },
    },
    avatar: {
        color: 'black',
        [theme.breakpoints.down('xs')]: {
            marginLeft: `-${theme.spacing(1)}px`,
        },
    },
    selected: {
        backgroundColor: '#646464',
        '&:hover': {
            backgroundColor: '#7a7a7a',
        }
    }
}));

function Header() {

    const classes = useStyles();
    const history = useHistory();
    const authState = useSelector(state => state.user.authState);
    const companies = useSelector(state => state.companies.companies);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    console.log();

    const handleNavigate = url => {
        history.push(url);
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    if(authState !== AUTHORIZED_AUTH_STATE) {
        return null;
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

                <ListItem
                    button
                    onClick={() => handleNavigate('/')}
                    className={location.pathname === '/' ? classes.selected : ''}
                >
                    <ListItemIcon>
                        <Notifications className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary='Notifications' />
                </ListItem>

                {companies.map((company) => {

                    const splitName = company.displayName.split(' ');
                    const shortName = splitName[0][0] + splitName[1][0];

                    return (
                        <ListItem
                            button
                            key={company.profileId}
                            onClick={() => handleNavigate('/company/' + company.profileId)}
                            className={location.pathname.startsWith('/company/') ? classes.selected : ''}
                        >
                            <ListItemIcon>
                                <Avatar className={classes.avatar}>{shortName}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={company.displayName} />
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    );
}

export default Header;
