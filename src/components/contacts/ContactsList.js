import React from "react";
import {Typography, List} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ContactsListItem from "./ContactsListItem";

const useStyles = makeStyles((theme) => ({
    groupLetter: {
        margin: `${theme.spacing(4)}px 0 0`
    }
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

const ContactsGroupedByFirstLetter = mockContacts.reduce((groupedContacts, contact) => {
    let firstLetter = contact.name[0];
    if(!groupedContacts[firstLetter]) groupedContacts[firstLetter] = {firstLetter, children: [contact]}
    else groupedContacts[firstLetter].children.push(contact);
    return groupedContacts;
}, {})

function Contacts() {

    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                Object.keys(ContactsGroupedByFirstLetter).map((group) =>
                    <React.Fragment key={`first-letter-${ContactsGroupedByFirstLetter[group].firstLetter}`}>
                        <li className={classes.groupLetter}>
                            <Typography variant="h6">
                                {ContactsGroupedByFirstLetter[group].firstLetter}
                            </Typography>
                        </li>
                        {
                            ContactsGroupedByFirstLetter[group].children.map((contact) =>
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
