/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveProfile = /* GraphQL */ `
  mutation SaveProfile($profile: ProfileInput!) {
    saveProfile(profile: $profile) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile($profileId: ID!, $profile: ProfileInput!) {
    updateProfile(profileId: $profileId, profile: $profile) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile($profileId: ID!) {
    deleteProfile(profileId: $profileId) {
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
