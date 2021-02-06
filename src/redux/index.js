import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import requestsReducer from "./reducers/requestsReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
    requests: requestsReducer,
    users: usersReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));