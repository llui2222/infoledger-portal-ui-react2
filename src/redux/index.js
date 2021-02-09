import { combineReducers } from "redux";
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import requestsReducer from "./reducers/requestsReducer";
import usersReducer from "./reducers/usersReducer";
import notificationsReducer from "./reducers/notificationsReducer";

const rootReducer = (history) =>  combineReducers({
    router: connectRouter(history),
    requests: requestsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
});

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer(history),

    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware)
    )
);