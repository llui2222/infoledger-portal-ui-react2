import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {screen, waitFor, fireEvent} from '@testing-library/react'
import { allProfiles } from "../../graphql/queries";
import CompanySettingsEditor from "./CompanySettingsEditor";
import { gql } from "@apollo/client/core";
import { MockedProvider } from "@apollo/client/testing";
import { renderWithReduxRouter } from "../../helpers/testHelpers";
import {Provider, useSelector} from "react-redux";
import { saveProfile } from "../../graphql/mutations";

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
};

const mockStateWithChildCompanies = {
  companies: {
    childCompanies: {
      profileId:"1620133432708568",
      profileStatus:"ACTIVE",
      profileType:"COMPANY",
      parentProfileId:"1620133201339239",
      displayName:"TaganrogIT",
      country:"Russia",
      streetAddress:"Petrovskaya ",
      city:"Taganrog",
      postalCode:"333333",
      phoneNumber:"8-800-000-00-00",
      currency:"USD",
    },
    refetch: jest.fn().mockImplementation(() => Promise.resolve())
  },
};
const path = '1620115604864972';
const companyID = '1620133432708568';
const renderComponent = (initialState, mocks) => {

  return renderWithReduxRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CompanySettingsEditor/>
    </MockedProvider>,
    {
      route: `${path}/settings/edit/${companyID}`,
      initialState: initialState
    }
  );
}

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

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
};

describe('Company setting editor rendered', () => {

  beforeEach(() => {
    renderComponent(mockStateWithChildCompanies, graphQlMocks);
    useSelector.mockImplementation(callback => {
      return callback(mockStateWithChildCompanies.companies.childCompanies);
    });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('Company setting editor  for ORGANIZATION rendered',  async() => {
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByText(/SET TIME/i)).toBeInTheDocument();
    expect(screen.getByText(/InfoLedger Id/i)).toBeInTheDocument();
    expect(screen.getByText(/Forwarding/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code:',  { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText('Street:',  { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText('City:',  { selector: 'input' })).toBeInTheDocument();
  });

  it('Country input is activated ',  async() => {
    const editCountry = screen.getByTestId('country-edit');
    fireEvent.click(editCountry)
    expect(editCountry).not.toBeInTheDocument();
    const autocomplete = screen.getByTestId('country-autocomplete');
    expect(autocomplete).toBeInTheDocument();
  });

  it('Currency input is not disabled ', () => {
    const editCurrency = screen.getByTestId('currency-edit');
    fireEvent.click(editCurrency)
    expect(editCurrency).not.toBeInTheDocument();
    const autocomplete = screen.getByTestId('currency-autocomplete');
    expect(autocomplete).toBeInTheDocument();
  });

});
