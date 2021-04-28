import React from 'react';
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect';
import {cleanup, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompanyCreatePopup from "./CompanyCreatePopup";
import {MockedProvider} from "@apollo/client/testing";
import {gql} from "@apollo/client/core";
import {allProfiles} from "../../graphql/queries";
import {renderWithReduxRouter} from "../../helpers/testHelpers";
import {companyCreateFailure} from "../../redux/actions/company";
import {handleNext} from "../../redux/actions/stepForm";

const graphQlMocks = [
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
];

const mockDispatchFn = jest.fn();

const renderComponent = initialState => {

    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    return renderWithReduxRouter(
        <MockedProvider mocks={graphQlMocks} addTypename={false}>
            <CompanyCreatePopup/>
        </MockedProvider>,
        {
            route: '/create-company',
            initialState: initialState
        }
    );
}

describe('CompanyCreatePopup Root', () => {

    const mockStateWithRootCompany = {
        companies: {
            rootCompany: undefined
        },
        stepForm: {
            allSteps: [],
            step: 0,
            next: 0
        }
    }

    beforeEach(() => {
        renderComponent(mockStateWithRootCompany);
    });

    afterEach(() => {
        cleanup();
    });

    it('Company Create modal rendered', () => {
        expect(screen.getByText(/Add a Company/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
        expect(screen.queryByText('Company')).toBeNull();
        expect(screen.queryByText('Business Address')).toBeNull();
    });

    it('Next button handled', async () => {

        userEvent.click(screen.getByRole('button', { name: 'Add' }));

        await waitFor(() => {
            expect(mockDispatchFn).toHaveBeenCalledWith(handleNext());
        })
    });
})

describe('CompanyCreatePopup Child', () => {

    const mockStateWithRootCompany = {
        companies: {
            rootCompany: {
                name: 'Test Company'
            }
        },
        stepForm: {
            allSteps: [
                'Test Step 1',
                'Test Step 2'
            ],
            step: 0,
            next: 0
        }
    }

    beforeEach(() => {
        renderComponent(mockStateWithRootCompany);
    });

    afterEach(cleanup);

    it('Company Create modal rendered', async () => {
        expect(screen.getByText(/Test Step 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Step 2/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Add' })).toBeNull();
    });

    it('Cancel Button click handled. Popup closed', async () => {

        const popupBackdrop = screen.getByRole('presentation').firstChild;

        expect(popupBackdrop).toBeVisible();
        userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(popupBackdrop).not.toBeVisible();
    });

    // it('Base Fields Rendered', async () => {
    //
    //     expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Company Name/i)).toBeRequired();
    //     expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    //     expect(screen.queryByLabelText(/Currency/i)).toBeNull();
    //     expect(screen.queryByLabelText(/Street 1/i)).toBeNull();
    // });
})