import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import requestsReducer from "./requestsReducer";
import userReducer from "./userReducer";
import notificationsReducer from "./notificationsReducer";
import encryptionReducer from "./encryptionReducer";
import companiesReducer from "./companiesReducer";
import stepFormReducer from "./stepFormReducer";

const rootReducer = (history) =>  combineReducers({
    router: connectRouter(history),
    requests: requestsReducer,
    user: userReducer,
    notifications: notificationsReducer,
    encryption: encryptionReducer,
    companies: companiesReducer,
    stepForm: stepFormReducer
});

export default rootReducer;