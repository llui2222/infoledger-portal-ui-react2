import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, screen, waitFor, fireEvent, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompanyCreatePopup from "./CompanyCreatePopup";
import {MockedProvider} from "@apollo/client/testing";
import {gql} from "@apollo/client/core";
import {allProfiles} from "../../graphql/queries";
import {renderWithReduxRouter} from "../../helpers/testHelpers";
import {saveProfile} from "../../graphql/mutations";

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
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                "profile":{
                    "profileName":"Test Company",
                    "currency":"USD",
                    "billingAddress":
                        {
                            "country":"Belarus"
                        },
                    "profileType":"ORGANIZATION",
                    "typeOfBusiness":"ASSET_OWNER"
                }
            }
        },
        result: {
            data: {
                saveProfile: {
                    profileId: "test-id",
                }
            }
        }
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                "profile":{
                    "profileName":"Test Company",
                    "currency":"USD",
                    "billingAddress":
                        {
                            "country":"Belarus"
                        },
                    "profileType":"INDIVIDUAL_INVESTOR",
                    "typeOfBusiness":"ASSET_OWNER"
                }
            }
        },
        result: {
            data: {
                saveProfile: {
                    profileId: "test-id",
                }
            }
        }
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                "profile":{
                    "profileName":"Test Company",
                    "billingAddress":
                        {
                            "country":"Belarus"
                        },
                    "profileType":"ORGANIZATION",
                    "typeOfBusiness":"SERVICE_COMPANY"
                }
            }
        },
        result: {
            data: {
                saveProfile: {
                    profileId: "test-id",
                }
            }
        }
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                profile:
                    {
                        profileName:"Test company",
                        currency:"USD",
                        billingAddress:
                            {
                                country:"Belarus"
                            },
                        profileType:"ORGANIZATION",
                        typeOfBusiness:"ASSET_OWNER"
                    }
            },
        },
        result: {
            data: {
                saveProfile: {
                    profileId: "test-id",
                }
            }
        }
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                profile:
                    {
                        profileName:"Test company",
                        currency:"USD",
                        profileType:"COMPANY",
                        businessAddress:
                            {
                                country:"Belarus",
                                streetAddress:"Test Street Test Street 2",
                                city:"Test City",
                                postalCode:"10108",
                                phoneNumber:"+123 (45) 678-90-12"
                            }
                    }
            },
        },
        result: {
            data: {
                saveProfile: {
                    profileId: "test-id",
                }
            }
        }
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                profile:
                    {
                        profileName:"Test company",
                        currency:"USD",
                        profileType:"COMPANY",
                        businessAddress:
                            {
                                country:"Belarus",
                                streetAddress:"Test Street Test Street 2",
                                city:"Test City",
                                postalCode:"10108",
                                phoneNumber:"+123 (45) 678-90-12"
                            }
                    }
            },
        },
        result: {
            error: new Error('An error occurred'),
        }
    }
];

const graphQlMocksError = [
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
    },
    {
        request: {
            query: gql`${saveProfile}`,
            variables: {
                profile:
                    {
                        profileName:"Test company",
                        currency:"USD",
                        profileType:"COMPANY",
                        businessAddress:
                            {
                                country:"Belarus",
                                streetAddress:"Test Street Test Street 2",
                                city:"Test City",
                                postalCode:"10108",
                                phoneNumber:"+123 (45) 678-90-12"
                            }
                    }
            },
        },
        result: {
            error: new Error('An error occurred'),
        }
    }
];

const mockStateWithRootCompany = {
    companies: {
        rootCompany: {
            name: 'Test Company'
        },
        refetch: jest.fn().mockImplementation(() => Promise.resolve())
    },
    stepForm: {
        allSteps: [],
        step: 0,
        next: 0
    }
};

const mockStateWithoutRootCompany = {
    companies: {
        rootCompany: undefined,
        refetch: jest.fn().mockImplementation(() => Promise.resolve())
    },
    stepForm: {
        allSteps: [],
        step: 0,
        next: 0
    }
}

const renderComponent = (initialState, mocks) => {

    return renderWithReduxRouter(
        <MockedProvider mocks={mocks} addTypename={false}>
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

const processedToSecondPage = async () => {

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
}

describe('CompanyCreatePopup Root', () => {

    let testStore;

    beforeEach(() => {
        act(() => {
            const {store} = renderComponent(mockStateWithoutRootCompany, graphQlMocks);
            testStore = store;
        });
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

    it('ORGANIZATION submit', async () => {

        const countryAutocomplete = screen.getByTestId('country-autocomplete');
        const countryField = screen.getByLabelText(/Country/i);
        userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
        fireEvent.mouseDown(screen.getByLabelText(/Account Type/i));
        fireEvent.click(screen.getByText(/Asset Owner Organization/i));

        await waitFor(() => {
            expect(screen.getByTestId('currency-autocomplete')).toBeInTheDocument();
        });

        const currencyAutocomplete = screen.getByTestId('currency-autocomplete');
        const currencyField = screen.getByLabelText(/Currency/i);

        await autocompleteSetValue(currencyAutocomplete, currencyField, 'USD');
        await autocompleteSetValue(countryAutocomplete, countryField, 'Belarus');

        userEvent.click(screen.getByRole('button', {name: 'Add'}));
        testStore.getState().companies.refetch = jest.fn().mockImplementation(() => Promise.resolve());

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(testStore.getState().companies.refetch).toHaveBeenCalled();
        });
    })

    it('INDIVIDUAL INVESTOR submit', async () => {

        const countryAutocomplete = screen.getByTestId('country-autocomplete');
        const countryField = screen.getByLabelText(/Country/i);
        userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
        fireEvent.mouseDown(screen.getByLabelText(/Account Type/i));
        fireEvent.click(screen.getByText(/Individual Investor/i));

        await waitFor(() => {
            expect(screen.getByTestId('currency-autocomplete')).toBeInTheDocument();
        });

        const currencyAutocomplete = screen.getByTestId('currency-autocomplete');
        const currencyField = screen.getByLabelText(/Currency/i);

        await autocompleteSetValue(currencyAutocomplete, currencyField, 'USD');
        await autocompleteSetValue(countryAutocomplete, countryField, 'Belarus');

        userEvent.click(screen.getByRole('button', {name: 'Add'}));
        testStore.getState().companies.refetch = jest.fn().mockImplementation(() => Promise.resolve());

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(testStore.getState().companies.refetch).toHaveBeenCalled();
        });
    })

    it('SERVICE ORGANIZATION submit', async () => {

        const countryAutocomplete = screen.getByTestId('country-autocomplete');
        const countryField = screen.getByLabelText(/Country/i);
        userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
        fireEvent.mouseDown(screen.getByLabelText(/Account Type/i));
        fireEvent.click(screen.getByText(/Service Company/i));

        await autocompleteSetValue(countryAutocomplete, countryField, 'Belarus');

        userEvent.click(screen.getByRole('button', {name: 'Add'}));
        testStore.getState().companies.refetch = jest.fn().mockImplementation(() => Promise.resolve());

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(testStore.getState().companies.refetch).toHaveBeenCalled();
        });
    })
});

describe('CompanyCreatePopup Child', () => {

    beforeEach(() => {
        renderComponent(mockStateWithRootCompany, graphQlMocks);
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
})

describe('Child CompanyCreatePopup Submit', () => {

    beforeEach(async () => {

        act(() => {
            renderComponent(mockStateWithRootCompany, graphQlMocks);
        });

        await processedToSecondPage();
    });

    afterEach(cleanup);

    it('Second Step Fields Should be invalid', async () => {

        userEvent.type(screen.getByLabelText(/Company Name/i), 'Test company');

        userEvent.click(screen.getByRole('button', { name: 'Add' }));

        await waitFor(() => {
            expect(screen.getByRole('label', { name: /Street 1/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /City/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Postal Code/i })).toHaveClass('Mui-error');
            expect(screen.getByRole('label', { name: /Phone Number/i })).toHaveClass('Mui-error');
        })
    });

    it('Company Successfully added', async () => {

        const street1Field = screen.queryByLabelText(/Street 1/i);
        const street2Field = screen.queryByLabelText(/Street 2/i);
        const cityField = screen.queryByLabelText(/City/i);
        const postalCodeField = screen.queryByLabelText(/Postal Code/i);
        const phoneNumberField = screen.queryByLabelText(/Phone Number/i);

        userEvent.type(street1Field, 'Test Street');
        userEvent.type(street2Field, 'Test Street 2');
        userEvent.type(cityField, 'Test City');
        userEvent.type(postalCodeField, '10108');
        userEvent.type(phoneNumberField, '+123 (45) 678-90-12');

        userEvent.click(screen.getByRole('button', { name: 'Add' }));

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(street1Field.value).toEqual('');
            expect(street2Field.value).toEqual('');
            expect(cityField.value).toEqual('');
            expect(postalCodeField.value).toEqual('');
            expect(phoneNumberField.value).toEqual('');
        })
    });
})

describe('Child CompanyCreatePopup Submit Error', () => {

    let testStore;

    beforeEach(async () => {

        act(() => {
            const {store} = renderComponent(mockStateWithRootCompany, graphQlMocksError);
            testStore = store;
        });

        await processedToSecondPage();
    });

    afterEach(cleanup);

    it('Company Add Error should be displayed', async () => {

        userEvent.type(screen.queryByLabelText(/Street 1/i), 'Test Street');
        userEvent.type(screen.queryByLabelText(/Street 2/i), 'Test Street 2');
        userEvent.type(screen.queryByLabelText(/City/i), 'Test City');
        userEvent.type(screen.queryByLabelText(/Postal Code/i), '10108');
        userEvent.type(screen.queryByLabelText(/Phone Number/i), '+123 (45) 678-90-12');

        userEvent.click(screen.getByRole('button', { name: 'Add' }));

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(testStore.getState().companies.refetch).toHaveBeenCalled();
        })
    });
})