import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useHistory,useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: '#646464',
        '&:hover': {
            backgroundColor: '#7a7a7a',
        }
    }
}));

function SidebarMenuItem({itemAction, url, text, children}) {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const handleNavigate = url => {
        history.push(url);
    }

    return (
        <ListItem
            button
            onClick={itemAction ? itemAction : () => handleNavigate(url)}
            className={location.pathname === url ? classes.selected : ''}
        >
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default SidebarMenuItem;
