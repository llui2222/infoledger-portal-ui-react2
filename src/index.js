import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {sagaMiddleware} from "./redux";
import rootSaga from "./redux/sagas/root";
import { AUTH_TYPE } from 'aws-appsync';
import amplifyAWSConfig from "./amplifyAWSConfig";
import { getJwtToken } from "./redux/api/auth";
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

sagaMiddleware.run(rootSaga);

const config = {
    url: amplifyAWSConfig.graphqlEndpoint,
    region: amplifyAWSConfig.region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => await getJwtToken,
    }
}

const client = new ApolloClient({
    link: ApolloLink.from([
        createAuthLink(config),
        createSubscriptionHandshakeLink(config)
    ]),
    cache: new InMemoryCache(),
    disableOffline: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        }
    }
})

ReactDOM.render(<ApolloProvider client={client}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</ApolloProvider>, document.getElementById('root'));