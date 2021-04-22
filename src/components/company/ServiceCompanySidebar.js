import React, {useState} from "react";
import {
    Drawer,
    List,
    Divider,
} from '@material-ui/core';
import { Notifications, Menu } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../app/Logo";
import {useSelector} from "react-redux";
import {AUTHORIZED_AUTH_STATE} from "../../utils/constants";
import SidebarMenuItem from "../app/SidebarMenuItem";
import EngineerMenu from "../app/EngineerMenu";
import ServiceCompanySidebarItem from "./ServiceCompanySidebarItem";

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
}));

function ServiceCompanySidebar() {

    const classes = useStyles();
    const authState = useSelector(state => state.user.authState);
    const childCompanies = useSelector(state => state.companies.childCompanies);
    const rootCompany = useSelector(state => state.companies.rootCompany);
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    if(authState !== AUTHORIZED_AUTH_STATE || !rootCompany) {
        return null;
    }

    if(rootCompany.typeOfBusiness !== 'SERVICE_COMPANY') {
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

                <ServiceCompanySidebarItem company={rootCompany}/>
                <Divider />

                {childCompanies.map((company) => {

                    if(!company) {
                        return null;
                    }

                    return (
                        <ServiceCompanySidebarItem key={company.profileId} company={company}/>
                    )
                })}

                <EngineerMenu/>

            </List>
        </Drawer>
    );
}

export default ServiceCompanySidebar;
