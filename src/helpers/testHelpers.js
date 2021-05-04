import React from "react";
import {Router} from 'react-router-dom';
import { routerMiddleware } from 'connected-react-router';
import { render } from '@testing-library/react';
import {createMemoryHistory} from "history";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../redux/reducers/rootReducer";

const getHistory = route => createMemoryHistory({initialEntries: [route]});

export const renderWithRouter = (
    component,
    {
        route = '/',
        history = getHistory(route)
    } = {}
) => {
    const Wrapper = ({children}) => (
        <Router history={history}>
            {React.cloneElement(children, { history: history })}
        </Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history
    }
}

export const renderWithReduxRouter = (
    component,
    {
        route = '/',
        history = getHistory(route),
        initialState = {},
        store = createStore(
            rootReducer(history),
            initialState,
            applyMiddleware(routerMiddleware(history))
        )
    } = {}
) => {
    const Wrapper = ({children}) => (
        <Router history={history}>
            <Provider store={store}>
                {children}
            </Provider>
        </Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        store,
        history
    }
}