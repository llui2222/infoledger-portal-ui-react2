import React from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {history} from "../../../redux";

function LogoutItem() {

    const handleLogout = () => {
        history.push('/logout');
    }

    return (
        <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
        </ListItem>
    );
}

export default LogoutItem;
