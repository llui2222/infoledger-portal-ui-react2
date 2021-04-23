import React from "react";
import {List, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useRouteMatch, useLocation} from "react-router-dom";
import {history} from "../../redux";
import {useSelector} from "react-redux";

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
    const rootCompany = useSelector(state => state.companies.rootCompany);

    if(!company && !rootCompany) return null;

    const getCompany = () => {

        if(!company) {
            return rootCompany;
        } else {
            return company;
        }
    }

    const handleNavigate = linkUrl => {
        history.push(linkUrl);
    }

    const menuItems = [
        {
            name: getCompany().displayName,
            itemClass: classes.companyItem,
            textClass: classes.company,
            notSelected: true,
            access: ['SERVICE_COMPANY', 'INDIVIDUAL_INVESTOR']
        },
        {
            name: 'Notifications',
            url: '/',
            access: ['INDIVIDUAL_INVESTOR']
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
            url: `/company/${getCompany().profileId}/settings`,
            access: ['SERVICE_COMPANY', 'INDIVIDUAL_INVESTOR']
        }
    ];

    const isSelected = (item) => {
        if(item.notSelected) {
            return false;
        }

        if(location.pathname.endsWith(item.url)) {
            return true;
        }
    }

    return (
        <List component="nav" className={classes.container}>
            {menuItems.map(item => {

                if(
                    getCompany().typeOfBusiness === 'SERVICE_COMPANY' &&
                    (!item.access || !item.access.includes('SERVICE_COMPANY'))
                ) {
                    return null;
                }

                if(
                    getCompany().profileType === 'INDIVIDUAL_INVESTOR' &&
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
                        selected={isSelected(item)}
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
