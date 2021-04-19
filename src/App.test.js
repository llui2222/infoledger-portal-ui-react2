import React from "react";
import {render} from '@testing-library/react'
import regeneratorRuntime from "regenerator-runtime";
import {MockedProvider} from '@apollo/client/testing';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {allProfiles} from "./graphql/queries";
import {gql} from "@apollo/client/core";

describe('<App />', () => {
    test('<App /> renders successfully', () => {
        const mocks = [
            {
                request: {
                    query: gql`${allProfiles}`,
                },
                result: {
                    data: {
                        allProfiles: [
                            {}
                        ]
                    }
                }
            }
        ]
        render(<Router><MockedProvider mocks={mocks} addTypename={false}><App/></MockedProvider></Router>);
    });
});