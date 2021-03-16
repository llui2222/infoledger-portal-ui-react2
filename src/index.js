import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {sagaMiddleware} from "./redux";
import rootSaga from "./redux/sagas/root";
import amplifyAWSConfig from "./amplifyAWSConfig";
import { getJwtToken } from "./redux/api/auth";
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

sagaMiddleware.run(rootSaga);

const config = {
    url: amplifyAWSConfig.appSync.graphqlEndpoint,
    region: amplifyAWSConfig.appSync.region,
    auth: {
        type: amplifyAWSConfig.appSync.authenticationType,
        jwtToken: getJwtToken,
    }
}

const client = new ApolloClient({
    link: ApolloLink.from([
        createAuthLink(config),
        createSubscriptionHandshakeLink(config)
    ]),
    cache: new InMemoryCache()
})

ReactDOM.render(<ApolloProvider client={client}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</ApolloProvider>, document.getElementById('root'));