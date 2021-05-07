import React from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {history} from "../../../redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logOut: {
        color: '#d32f2f',
    },
}));

function LogoutItem() {

    const classes = useStyles();

    const handleLogout = () => {
        history.push('/logout');
    }

    return (
        <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" className={classes.logOut} />
        </ListItem>
    );
}

export default LogoutItem;
