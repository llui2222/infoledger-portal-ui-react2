import React from "react";
import {Typography, Box, Button, ButtonGroup, IconButton, FormControl, OutlinedInput, InputAdornment} from '@material-ui/core';
import {Add, Search} from '@material-ui/icons';
import PageContainer from "../PageContainer";
import { makeStyles } from "@material-ui/core/styles";
import ContactsList from "./ContactsList";

const useStyles = makeStyles((theme) => ({
    contactsHeader: {
        display: 'flex'
    },
    contactsHeaderTitle: {
        marginRight: 'auto'
    },
    contactSearch: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.spacing(3),
        '& .MuiInputBase-root': {
            borderRadius: theme.spacing(4)
        },
        '& .MuiOutlinedInput-adornedEnd': {
            paddingRight: 0
        }
    },
    contactFilters: {
        display: 'flex',
        marginTop: theme.spacing(5)
    },
    contactTypesFilters: {
        marginRight: 'auto'
    },
    inviteButton: {
        height: theme.spacing(4.5),
        margin: 'auto 0'
    }
}));

function Contacts() {

    const classes = useStyles();

    return (
        <PageContainer>
            <Box className={classes.contactsHeader}>
                <Typography
                    variant="h4"
                    gutterBottom
                    className={classes.contactsHeaderTitle}
                >
                    Contacts
                </Typography>
                <Button
                    variant="outlined"
                    color="default"
                    startIcon={<Add />}
                    className={classes.inviteButton}
                >
                    Invite
                </Button>

                <FormControl className={classes.contactSearch}>
                    <OutlinedInput
                        id="filled-adornment-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton type="submit" aria-label="search">
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
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
            <ContactsList/>
        </PageContainer>
    );
}

export default Contacts;
