import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        minHeight: 'calc(100% - 56px)'
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
