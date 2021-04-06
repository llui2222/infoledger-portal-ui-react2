import React from "react";
import {Box, Button, ButtonGroup} from '@material-ui/core';
import PageContainer from "../common/containers/PageContainer";
import { makeStyles } from "@material-ui/core/styles";
import ContactsListContainer from "./ContactsListContainer";
import PageHeader from "../common/PageHeader";
import InviteContactPopup from "./InviteContactPopup";

const useStyles = makeStyles((theme) => ({
    contactFilters: {
        display: 'flex',
        marginTop: theme.spacing(5)
    },
    contactTypesFilters: {
        marginRight: 'auto'
    },
    contactsListContainer: {
        display: 'flex'
    }
}));

function Contacts() {

    const classes = useStyles();

    return (
        <PageContainer>
            <PageHeader title='Contacts'>
                <InviteContactPopup/>
            </PageHeader>
            <Box className={classes.contactFilters}>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                    className={classes.contactTypesFilters}
                >
                    <Button>Clients</Button>
                    <Button>Vendors</Button>
                </ButtonGroup>

                <ButtonGroup color="primary">
                    <Button>List</Button>
                    <Button>Companies</Button>
                    <Button>Groups</Button>
                </ButtonGroup>
            </Box>
            <Box className={classes.contactsListContainer}>
                <ContactsListContainer/>
            </Box>
        </PageContainer>
    );
}

export default Contacts;
