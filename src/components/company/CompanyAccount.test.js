import React from 'react';
import {gql} from '@apollo/client/core';
import '@testing-library/jest-dom/extend-expect';
import {MockedProvider} from '@apollo/client/testing';
import {act, cleanup, fireEvent, getByText, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { allProfiles } from '../../graphql/queries';
import { updateProfile } from '../../graphql/mutations';
import { renderWithReduxRouter } from '../../helpers/testHelpers';
import CompanyAccount from "./CompanyAccount";
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
      query: gql`${updateProfile}`,
      variables: {
        profileId: "123456789123",
        profile: {
          profileType: "COMPANY",
          profileName: "34566",
          parentProfileId: "123456789123",
          businessAddress: {
            country: "russia",
            streetAddress: "chechova",
            city: "taganrog",
            postalCode: "347900",
            phoneNumber: "88009007658",
          },
        }
      }
    },
    result: {
      data: {
        updateProfile: {
          profileId: "123456789123",
          profileType: "COMPANY",
          profileName: "34566",
          parentProfileId: "123456789123",
          businessAddress: {
            country: "russia",
            streetAddress: "chechova",
            city: "taganrog",
            postalCode: "347900",
            phoneNumber: "88009007658",
          }
        }
      }
    }
  }
]
const mockStateWithCompany = {
  companies: {
    childCompanies: [
      {
        name: 'Test Company'
      }
    ],
    rootCompany: {
      name: 'Test Company'
    },
    refetch: jest.fn().mockImplementation(() => Promise.resolve())
  },
};
const company = {
  company: {
    billingAddress: {
      postalCode: '347900',
      streetAddress: 'Test street',
      city: 'Test city',
      country: 'Test country'
    },
    displayName: 'Test name',
    typeOfBusiness: 'Test type',
  }
};
const renderComponent = (initialState, mocks) => {
  return renderWithReduxRouter(
    <MockedProvider mocks={mocks} addTypename={false} company={company}>
      <CompanyAccount company={company}/>
    </MockedProvider>,
    {
      route: '/account',
      initialState: initialState
    }
  );
}
describe('Render account', () => {
  let testStore;
  beforeEach(() => {
    act(() => {
      const {store} = renderComponent(mockStateWithCompany, graphQlMocks);
      testStore = store;
    });
  });
  afterEach(() => {
    cleanup();
  });

  it('should render', () => {
    expect(screen.getByText(/Avatar/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Back'})).toBeInTheDocument();
    expect(screen.queryByRole('Box', {name: 'Avatar'})).toBeNull();
    expect(screen.getByText(/Account type/i)).toBeInTheDocument();
    expect(screen.getByText(/Billing address/i)).toBeInTheDocument();
    expect(screen.queryByRole('Typography', {name: 'Test type'})).toBeNull();
    expect(screen.queryByRole('span', {name: '347900'})).toBeNull();
    expect(screen.queryByRole('span', {name: 'Test street'})).toBeNull();
    expect(screen.queryByRole('span', {name: 'Test city'})).toBeNull();
    expect(screen.queryByRole('span', {name: 'Test country'})).toBeNull();
    expect(screen.queryByRole('BorderColorIcon', {name: 'BorderColorIcon'})).toBeNull();
  });
  it('Should render all data', async () => {
    const businessAddress = screen.getByTestId('businessAddress');
    expect(businessAddress).toBeInTheDocument();
  })
  it('Edit Icon Button click handled', async () => {
    const editCompanyName = screen.getByTestId('companyName-edit');
    expect(screen.queryByRole('TextField', {name: 'Test name'})).toBeNull();
    fireEvent.click(editCompanyName);
    expect(editCompanyName).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Save' }));
    const orgName = screen.getByTestId('orgName');
    expect(orgName).toBeInTheDocument();
  });
});