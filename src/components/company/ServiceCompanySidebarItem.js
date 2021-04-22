import React from "react";
import {Avatar} from "@material-ui/core";
import SidebarMenuItem from "../app/SidebarMenuItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    avatar: {
        color: 'black',
        [theme.breakpoints.down('xs')]: {
            marginLeft: `-${theme.spacing(1)}px`,
        },
    }
}));

function ServiceCompanySidebarItem({company}) {

    const classes = useStyles();

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
    );
}

export default ServiceCompanySidebarItem;
