import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/app/Header";
import Router from "./components/app/Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import infoLedgerTheme from './theme';
import { Provider } from "react-redux";
import { store } from "./redux";
import { SnackbarProvider } from 'notistack';
import Loader from "./components/common/Loader";

function App() {

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={infoLedgerTheme}>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={3}>
                        <Provider store={store}>
                            <Header/>
                            <Router/>
                            <Loader/>
                        </Provider>
                    </SnackbarProvider>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
