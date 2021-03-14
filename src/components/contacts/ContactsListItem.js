import React from "react";
import {Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    contactTitle: {
        marginRight: theme.spacing(1)
    },
}));

function Contacts({contact}) {

    const classes = useStyles();

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={contact.name} src={contact.avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={contact.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                className={classes.contactTitle}
                            >
                                {contact.title}
                            </Typography>
                            {"My Fund"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
}

export default Contacts;
