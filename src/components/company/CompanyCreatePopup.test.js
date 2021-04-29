import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompanyCreatePopup from "./CompanyCreatePopup";
import {MockedProvider} from "@apollo/client/testing";
import {gql} from "@apollo/client/core";
import {allProfiles} from "../../graphql/queries";
import {renderWithReduxRouter} from "../../helpers/testHelpers";

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

const renderComponent = initialState => {

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

const autocompleteSetValue = async (autocomplete, input, value) => {
    autocomplete.focus();
    fireEvent.change(input, { target: { value: value } });

    await waitFor(() => {
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    })

    await waitFor(() => {
        fireEvent.keyDown(autocomplete, { key: 'Enter' })
    })

    await waitFor(() => {
        expect(input.value).toEqual(value)
    })
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

    it('All fields should be invalid', async () => {

        userEvent.click(screen.getByRole('button', { name: 'Add' }));

        await waitFor(() => {
            expect(screen.getByRole('label', { name: /Company Name/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Account Type/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Country/i })).toHaveClass('Mui-error');
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
            allSteps: [],
            step: 0,
            next: 0
        }
    }

    beforeEach(() => {
        renderComponent(mockStateWithRootCompany);
    });

    afterEach(cleanup);


    it('Company Create modal rendered', async () => {
        expect(screen.getByTestId(/Company/i)).toBeInTheDocument();
        expect(screen.getByTestId(/Business Address/i)).toBeInTheDocument();
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

    it('All fields should be invalid', async () => {

        userEvent.click(screen.getByRole('button', { name: 'Next' }));

        await waitFor(() => {
            expect(screen.getByRole('label', { name: /Company Name/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Base Currency/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Country/i })).toHaveClass('Mui-error');
        })
    });

    it('First Step Fields Rendered', () => {

        expect(screen.getByLabelText(/Company Name/i)).toBeVisible();
        expect(screen.getByLabelText(/Country/i)).toBeVisible();
        expect(screen.queryByLabelText(/Currency/i)).toBeVisible();

        expect(screen.queryByLabelText(/Street 1/i)).not.toBeVisible();
        expect(screen.queryByLabelText(/Street 2/i)).not.toBeVisible();
        expect(screen.queryByLabelText(/City/i)).not.toBeVisible();
        expect(screen.queryByLabelText(/Postal Code/i)).not.toBeVisible();
        expect(screen.queryByLabelText(/Phone Number/i)).not.toBeVisible();
    });

    it('Second Step Fields Rendered', async () => {

        const companyNameField = screen.getByLabelText(/Company Name/i);
        const currencyAutocomplete = screen.getByTestId('currency-autocomplete');
        const currencyField = screen.getByLabelText(/Currency/i);
        const countryAutocomplete = screen.getByTestId('country-autocomplete');
        const countryField = screen.getByLabelText(/Country/i);

        userEvent.type(companyNameField, 'Test company');

        await autocompleteSetValue(currencyAutocomplete, currencyField, 'USD');
        await autocompleteSetValue(countryAutocomplete, countryField, 'Belarus');

        userEvent.click(screen.getByRole('button', { name: 'Next' }));

        await waitFor(() => {

            expect(screen.queryByLabelText(/Street 1/i)).toBeVisible();
            expect(screen.queryByLabelText(/Street 2/i)).toBeVisible();
            expect(screen.queryByLabelText(/City/i)).toBeVisible();
            expect(screen.queryByLabelText(/Postal Code/i)).toBeVisible();
            expect(screen.queryByLabelText(/Phone Number/i)).toBeVisible();

            expect(companyNameField).not.toBeVisible();
            expect(countryField).not.toBeVisible();
            expect(currencyField).not.toBeVisible();
        })
    });
})