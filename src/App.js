import React, { useEffect } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from "react-redux";
import {store, history} from "./redux";
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router'
import infoLedgerTheme from './theme';
import AuthWrapper from "./components/user/AuthWrapper";
import IdleTimer from "./components/common/IdleTimer";
import * as infoLedgerSync from "./redux/api/tabsSync";
import AppContainer from "./components/app/AppContainer";

function App() {

    useEffect(() => {
        infoLedgerSync.init();
    })

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={infoLedgerTheme}>
                <Provider store={store}>
                    <IdleTimer>
                        <SnackbarProvider maxSnack={3}>
                            <AuthWrapper>
                                <ConnectedRouter history={history}>
                                    <AppContainer/>
                                </ConnectedRouter>
                            </AuthWrapper>
                        </SnackbarProvider>
                    </IdleTimer>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
