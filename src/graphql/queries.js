/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allProfiles = /* GraphQL */ `
  query AllProfiles($limit: Int) {
    allProfiles(limit: $limit) {
      profileId
      profileStatus
      profileType
      parentProfileId
      displayName
      createTimestamp
      deleteTimestamp
      updateTimestamp
      createdBy
      updatedBy
      deletedBy
      userPoolId
      businessAddress {
        country
        streetAddress
        city
        postalCode
        phoneNumber
      }
      billingAddress {
        country
        streetAddress
        city
        postalCode
        phoneNumber
      }
      typeOfBusiness
      infoledgerClientType
      currency
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($profileId: ID!) {
    getProfile(profileId: $profileId) {
      profileId
      profileStatus
      profileType
      parentProfileId
      displayName
      createTimestamp
      deleteTimestamp
      updateTimestamp
      createdBy
      updatedBy
      deletedBy
      userPoolId
      businessAddress {
        country
        streetAddress
        city
        postalCode
        phoneNumber
      }
      billingAddress {
        country
        streetAddress
        city
        postalCode
        phoneNumber
      }
      typeOfBusiness
      infoledgerClientType
      currency
    }
  }
`;
