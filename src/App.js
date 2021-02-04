import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/app/Header";
import Router from "./components/app/Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import infoLedgerTheme from './theme';

function App() {

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={infoLedgerTheme}>
                <BrowserRouter>
                    <Header/>
                    <Router/>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
