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
            notSelected: true,
            access: ['SERVICE_COMPANY', 'INDIVIDUAL_INVESTOR']
        },
        {
            name: 'Investments'
        },
        {
            name: 'Clients'
        },
        {
            name: 'Dashboards',
            access: ['INDIVIDUAL_INVESTOR']
        },
        {
            name: 'Contacts',
            access: ['SERVICE_COMPANY', 'INDIVIDUAL_INVESTOR']
        },
        {
            name: 'Settings',
            url: '/settings',
            access: ['SERVICE_COMPANY', 'INDIVIDUAL_INVESTOR']
        }
    ];

    return (
        <List component="nav" className={classes.container}>
            {menuItems.map(item => {

                if(
                    company.typeOfBusiness === 'SERVICE_COMPANY' &&
                    (!item.access || !item.access.includes('SERVICE_COMPANY'))
                ) {
                    return null;
                }

                if(
                    company.profileType === 'INDIVIDUAL_INVESTOR' &&
                    (!item.access || !item.access.includes('INDIVIDUAL_INVESTOR'))
                ) {
                    return null;
                }

                return(
                    <ListItem
                        button
                        className={item.itemClass ? item.itemClass : ''}
                        onClick={() => (item.url !== undefined ? handleNavigate(item.url) : undefined )}
                        key={item.name}
                        selected={!item.notSelected && location.pathname.endsWith(item.url)}
                    >
                        <ListItemText primary={item.name} className={item.textClass ? item.textClass : ''} />
                    </ListItem>
                );
            }

            )}
        </List>
    );
}

export default CompanySidebar;
