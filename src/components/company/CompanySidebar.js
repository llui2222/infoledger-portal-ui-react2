import React from "react";
import {List, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useRouteMatch, useLocation} from "react-router-dom";
import {history} from "../../redux";

const useStyles = makeStyles((theme) => ({
    container: {
        borderRight: '1px solid #ccc',
        width: '20%',
        minWidth: 200
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
    let { url } = useRouteMatch();
    let location = useLocation();

    const handleNavigate = linkUrl => {
        history.push(url + linkUrl);
    }

    const menuItems = [
        {
            name: company.displayName,
            itemClass: classes.companyItem,
            textClass: classes.company,
            url: '',
            notSelected: true
        },
        {
            name: 'Investments',
        },
        {
            name: 'Clients',
        },
        {
            name: 'Dashboards',
        },
        {
            name: 'Contacts',
        },
        {
            name: 'Settings',
            url: '/settings'
        }
    ];

    return (
        <List component="nav" className={classes.container}>
            {menuItems.map(item =>
                <ListItem
                    button
                    className={item.itemClass ? item.itemClass : ''}
                    onClick={() => (item.url !== undefined ? handleNavigate(item.url) : undefined )}
                    key={item.name}
                    selected={!item.notSelected && location.pathname.endsWith(item.url)}
                >
                    <ListItemText primary={item.name} className={item.textClass ? item.textClass : ''} />
                </ListItem>
            )}
        </List>
    );
}

export default CompanySidebar;
