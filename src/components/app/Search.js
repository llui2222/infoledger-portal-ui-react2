import React from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    searchRoot: {
        width: '96%',
        margin: '14px 2%'
    }
}));

function Search() {

    const classes = useStyles();

    return (
        <TextField variant="outlined" placeholder='Search' classes={{
            root: classes.searchRoot
        }} />
    );
}

export default Search;
