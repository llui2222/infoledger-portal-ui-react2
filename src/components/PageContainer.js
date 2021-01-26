import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    page: {
        padding: '40px 8%',
    },
}));

function PageContainer(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            {props.children}
        </div>
    );
}

export default PageContainer;
