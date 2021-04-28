import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers/rootReducer";

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