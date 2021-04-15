import React from "react";
import {List, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        borderRight: '1px solid #ccc',
        width: '20%',
        minWidth: 140
    },
    companyItem: {
        borderBottom: '1px solid #ccc',
    },
    company: {
        '&>span': {
            fontWeight: 'bold'
        }
    },
}));

function CompanySidebar({company}) {

    const classes = useStyles();

    return (
        <List component="nav" className={classes.container}>
            <ListItem className={classes.companyItem}>
                <ListItemText primary={company.displayName} className={classes.company} />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Investments" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Clients" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Dashboards" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Contacts" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Settings" />
            </ListItem>
        </List>
    );
}

export default CompanySidebar;
