import React from 'react';
import {gql} from '@apollo/client/core';
import '@testing-library/jest-dom/extend-expect';
import {MockedProvider} from '@apollo/client/testing';
import {act, cleanup, screen, waitFor} from '@testing-library/react';
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
    expect(screen.queryByRole('button', {name: 'Back'})).toBeNull();
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
    const postalCode = screen.queryByLabelText(/postalCode/i);
    const streetAddress = screen.queryByLabelText(/streetAddress/i);
    const city = screen.queryByLabelText(/city/i);
    const country = screen.queryByLabelText(/country/i);
    const displayName = screen.queryByLabelText(/displayName/i);
    const typeOfBusiness = screen.queryByLabelText(/typeOfBusiness/i);
    userEvent.type(postalCode, '347900');
    userEvent.type(streetAddress, 'Test street');
    userEvent.type(city, 'Test city');
    userEvent.type(country, 'Test country');
    userEvent.type(displayName, 'Test name');
    userEvent.type(typeOfBusiness, 'Test type');
    await act(() => {
      return new Promise(resolve => setTimeout(resolve, 0));
    });
    await waitFor(() => {
      expect(postalCode).toEqual('');
      expect(streetAddress).toEqual('');
      expect(city).toEqual('');
      expect(country).toEqual('');
      expect(displayName).toEqual('');
      expect(typeOfBusiness).toEqual('');
    })
  })
  it('Edit Icon Button click handled', async () => {
    expect(screen.queryByRole('TextField', {name: 'Test name'})).toBeNull();
    // const popupBackdrop = screen.getByRole('presentation').firstChild;
    // expect(popupBackdrop).toBeVisible();
    userEvent.click(screen.getByRole('button', { name: 'Save' }));
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    // expect(popupBackdrop).not.toBeVisible();
  });
});