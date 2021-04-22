import React, {useState} from "react";
import {
    Drawer,
    List,
    Avatar,
} from '@material-ui/core';
import { Notifications, Menu } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import SidebarMenuItem from "./SidebarMenuItem";
import EngineerMenu from "./EngineerMenu";

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
    }
}));

function SidebarMenu() {

    const classes = useStyles();
    const authState = useSelector(state => state.user.authState);
    const companies = useSelector(state => state.companies.companies);
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    if(authState !== AUTHORIZED_AUTH_STATE || companies.length === 0) {
        return null;
    }

    if(companies[0].typeOfBusiness !== 'SERVICE_COMPANY') {
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

                <SidebarMenuItem
                    itemAction={toggleDrawer}
                    text={<Logo/>}
                >
                    <Menu className={classes.icon} />
                </SidebarMenuItem>

                <SidebarMenuItem
                    url={'/'}
                    text='Notifications'
                >
                    <Notifications className={classes.icon}/>
                </SidebarMenuItem>

                {companies.map((company) => {

                    if(!company) {
                        return null;
                    }

                    const splitName = company.displayName.split(' ');
                    const shortName = splitName.length > 1?  splitName[0][0] + splitName[1][0]: splitName[0][0];

                    return (
                        <SidebarMenuItem
                            url={'/company/' + company.profileId}
                            text={company.displayName}
                            key={company.profileId}
                        >
                            <Avatar className={classes.avatar}>{shortName.toUpperCase()}</Avatar>
                        </SidebarMenuItem>
                    )
                })}

                <EngineerMenu/>

            </List>
        </Drawer>
    );
}

export default SidebarMenu;
