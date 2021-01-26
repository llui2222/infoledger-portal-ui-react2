import React from "react";
import { Typography, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { BusinessCenter, AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Search from "./Search";
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listHeader: {
        display: 'block',
        background: '#ccc',
        paddingLeft: 18,
        lineHeight: '31px'
    }
}));

const funds = [
    { name: 'Fund Lorem', role: '', icon: <BusinessCenter/> },
    { name: 'Ipsum Fund', role: '', icon: <BusinessCenter/> },
];

const contacts = [
    { name: 'John Doe', role: 'Fund Admin', icon: <AccountCircle/> },
    { name: 'Adam Smith', role: 'Fund Admin', icon: <AccountCircle/> },
    { name: 'Arnold Schwarzenegger', role: 'Investor', icon: <AccountCircle/> },
]

function Sidebar() {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const handleSelect = (discussionId) => {
        history.push('/messenger/' + discussionId);
    }

    const renderList = (items) =>
        items.map((item, key) =>
            <ListItem
                button
                key={`contact-${key}`}
                onClick={() => handleSelect(item.name)}
                selected={location.pathname === '/messenger/' + item.name}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} secondary={item.role} />
            </ListItem>
        )

    return (
        <div>
            <Search/>
            <Typography className={classes.listHeader} variant="overline">
                Funds
            </Typography>
            <List>
                {renderList(funds)}
            </List>
            <Divider />
            <Typography className={classes.listHeader} variant="overline">
                Communication
            </Typography>
            <List>
                {renderList(contacts)}
            </List>
        </div>
    );
}

export default Sidebar;
