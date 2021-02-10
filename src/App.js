import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from "react-redux";
import {store, history} from "./redux";
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router'
import infoLedgerTheme from './theme';
import Header from "./components/app/Header";
import Router from "./components/app/Router";
import Loader from "./components/common/Loader";
import Notifier from "./components/app/Notifier";

function App() {

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={infoLedgerTheme}>
                <Provider store={store}>
                    <SnackbarProvider maxSnack={3}>
                        <ConnectedRouter history={history}>
                            <Header/>
                            <Router/>
                            <Loader/>
                            <Notifier/>
                        </ConnectedRouter>
                    </SnackbarProvider>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
