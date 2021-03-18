import React, {useState, useEffect} from "react";
import {TextField, Button, Dialog, DialogTitle, DialogContent,DialogActions} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { gql, useMutation } from '@apollo/client';
import { createContact } from "../../graphql/mutations";
import {Add} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    inviteButton: {
        height: theme.spacing(4.5),
        margin: 'auto 0'
    },
}));

function Contacts() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [ownerId, setOwnerId] = useState('');
    const [contactId, setContactId] = useState('');
    const [addContact, { data }] = useMutation(gql(createContact));

    const handleAdd = () => {
        addContact({ variables: {
                input: {
                    ownerCognitoGroupId: ownerId,
                    contactCognitoGroupId: contactId,
                    statusIdTimestamp: new Date().toISOString(),
                },
            }
        });
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <>
            <Button
                variant="outlined"
                color="default"
                startIcon={<Add />}
                className={classes.inviteButton}
                onClick={() => setOpen(true)}
            >
                Invite
            </Button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle onClose={() => setOpen(false)}>
                    Invite
                </DialogTitle>
                <DialogContent dividers>
                    <TextField label="Emails" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpen(false)} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Contacts;
