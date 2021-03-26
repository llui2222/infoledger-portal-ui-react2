import React, {useState, useEffect} from "react";
import {
    TextField,
    Button,
    Dialog,
    Typography,
    DialogContent,
    DialogActions,
    Box,
    Chip,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { gql, useMutation } from '@apollo/client';
import { createContact } from "../../graphql/mutations";
import {Add} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    inviteButton: {
        height: theme.spacing(4.5),
        margin: 'auto 0'
    },
    addedEmail: {
        margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
    },
    addedEmailsList: {
        marginBottom: theme.spacing(1)
    },
    dialogHeader: {
        marginBottom: theme.spacing(3)
    }
}));

function Contacts() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [ownerId, setOwnerId] = useState('');
    const [contactId, setContactId] = useState('');
    const [addContact, { data }] = useMutation(gql(createContact));
    const [emailsAdded, setEmailsAdded] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState(false);

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

    const handleKeyPress = e => {
        if(['Enter', 'Tab'].includes(e.key)) {
            e.preventDefault();
            if (isEmailValid(emailInput)) {
                if(!emailsAdded.includes(emailInput)) {
                    setEmailsAdded([...emailsAdded, emailInput]);
                }
                setEmailInput('');
            } else {
                setError(true);
            }
        }
    }

    const handleEmailChange = e => {
        setEmailInput(e.currentTarget.value);
        setError(false);
    }

    const isEmailValid = email => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    const handleDelete = email => {

        const emails = [...emailsAdded];
        const index = emails.indexOf(email);

        if (index > -1) {
            emails.splice(index, 1);
            setEmailsAdded(emails);
        }
    }

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
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth='md'>
                <DialogContent dividers>
                    <Typography variant='h5' className={classes.dialogHeader}>
                        Invite
                    </Typography>
                    <Box className={classes.addedEmailsList}>
                        { emailsAdded.map( email =>
                            <Chip
                                label={email}
                                color="primary"
                                className={classes.addedEmail}
                                onDelete={() => handleDelete(email)}
                                key={email}
                            />
                        )}
                    </Box>
                    <TextField
                        label="Emails"
                        multiline
                        fullWidth
                        onKeyDown={handleKeyPress}
                        value={emailInput}
                        onChange={handleEmailChange}
                        error={error}
                        helperText={error && "Incorrect email"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {}}
                        color="primary"
                    >
                        Fill From Excel
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {}}
                        color="primary"
                        variant='contained'
                    >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Contacts;
