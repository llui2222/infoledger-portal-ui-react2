import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./app/Sidebar";
import {SIDEBAR_WIDTH} from "../constants";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        minHeight: 'calc(100% - 56px)'
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        borderRight: '1px solid #ccc'
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
            <div className={classes.sidebar}>
                <Sidebar/>
            </div>
            <div className={classes.body}>
                {props.children}
            </div>
        </div>
    );
}

export default PageContainer;
