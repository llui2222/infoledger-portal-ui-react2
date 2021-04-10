import React from "react";
import {List, ListItem, ListItemText} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import {allProfiles} from "../../graphql/queries";

function Companies() {

    const { loading, error, data } = useQuery(gql(allProfiles));

    if(error) {
        console.log(error);
    }

    if(data) {
        console.log(data);
    }

    return (
        <List component="nav">
            <ListItem button>
                <ListItemText primary="Company" />
            </ListItem>
        </List>
    );
}

export default Companies;
