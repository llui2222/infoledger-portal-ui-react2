import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        minHeight: '100%',
        flexGrow: 1
    },
    body: {
        padding: '40px 8%',
        flex: 1
    }
}));

function PageContainer(props) {

    const classes = useStyles();

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.body}>
                {props.children}
            </Box>
        </Box>
    );
}

export default PageContainer;
