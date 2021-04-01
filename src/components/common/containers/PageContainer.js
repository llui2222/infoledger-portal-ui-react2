import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
        <div className={classes.mainContainer}>
            <div className={classes.body}>
                {props.children}
            </div>
        </div>
    );
}

export default PageContainer;
