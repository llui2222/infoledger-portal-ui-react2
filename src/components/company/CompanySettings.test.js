import React from 'react';
import {gql} from '@apollo/client/core';
import '@testing-library/jest-dom/extend-expect';
import {MockedProvider} from '@apollo/client/testing';
import {act, cleanup, screen, getByTestId} from '@testing-library/react';
import { allProfiles } from '../../graphql/queries';
import { updateProfile } from '../../graphql/mutations';
import { renderWithReduxRouter } from '../../helpers/testHelpers';
import CompanySettings from './CompanySettings';

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
            streetAddress: "chekhova",
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
    typeOfBusiness: 'ASSET_OWNER',
  }
};

const renderComponent = (initialState, mocks) => {
  return renderWithReduxRouter(
    <MockedProvider mocks={mocks} addTypename={false} company={company}>
      <CompanySettings company={company}/>
    </MockedProvider>,
    {
      route: '/settings',
      initialState: initialState
    }
  );
}

describe('Render company settings', () => {
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

  it('Setting editor  for ORGANIZATION rendered', () => {
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Profile'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Viktor Duvanov'})).toBeNull();
    expect(screen.queryByRole('button', {name: 'Add a Company!'})).toBeNull();
    expect(screen.queryByRole('chip', {name: 'www'})).toBeNull();
    expect(screen.queryByRole('Link', {name: 'JTeam'})).toBeNull();
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/User & Permission/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Log Out'})).toBeInTheDocument();
  });
});
