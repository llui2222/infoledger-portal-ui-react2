import React from "react";
import {Typography, List, CircularProgress} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ContactsListItem from "./ContactsListItem";

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%'
    },
    groupLetter: {
        margin: `${theme.spacing(4)}px 0 0`
    },
}));

const mockContacts = [
    {
        name: 'John Doe',
        avatar: '/img/temp/avatar1.png',
        title: 'Fund Manager',
        organization: 'My fund'
    },
    {
        name: 'Demian Altztezakher',
        avatar: '/img/temp/avatar2.png',
        title: 'Fund Manager',
        organization: 'Fund Number One'
    },
]

const ContactsGroupedByFirstLetter = contacts => {
    return contacts.reduce((groupedContacts, contact) => {
        let firstLetter = contact.name[0];
        if(!groupedContacts[firstLetter]) groupedContacts[firstLetter] = {firstLetter, children: [contact]}
        else groupedContacts[firstLetter].children.push(contact);
        return groupedContacts;
    }, {})
}

function Contacts({contacts}) {

    const classes = useStyles();
    const preparedContacts = ContactsGroupedByFirstLetter(mockContacts);

    console.log('contacts', contacts);

    return (
        <List className={classes.list}>
            {
                Object.keys(preparedContacts).map((group) =>
                    <React.Fragment key={`first-letter-${preparedContacts[group].firstLetter}`}>
                        <li className={classes.groupLetter}>
                            <Typography variant="h6">
                                {preparedContacts[group].firstLetter}
                            </Typography>
                        </li>
                        {
                            preparedContacts[group].children.map((contact) =>
                                <ContactsListItem contact={contact} key={`contact-${contact.name}`}/>
                            )
                        }
                    </React.Fragment>
                )
            }
        </List>
    );
}

export default Contacts;
