import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/app/Header";
import Sidebar from "./components/app/Sidebar";
import Router from "./components/app/Router";
import { BrowserRouter } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import { SIDEBAR_WIDTH } from "./constants"

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
        flex: 1
    }
}));

function App() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <BrowserRouter>
                <Header/>
                <div className={classes.mainContainer}>
                    <div className={classes.sidebar}>
                        <Sidebar/>
                    </div>
                    <div className={classes.body}>
                        <Router/>
                    </div>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
