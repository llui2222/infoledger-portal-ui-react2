/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allProfiles = /* GraphQL */ `
  query AllProfiles($limit: Int, $nextToken: String) {
    allProfiles(limit: $limit, nextToken: $nextToken) {
      profiles {
        ownerGroupName
        profileStatusAndTimestampAndUuid
        profileStatus
        profileType
        parentProfileUUID
        displayName
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile(
    $ownerGroupName: ID!
    $profileStatusAndTimestampAndUuid: String!
  ) {
    getProfile(
      ownerGroupName: $ownerGroupName
      profileStatusAndTimestampAndUuid: $profileStatusAndTimestampAndUuid
    ) {
      ownerGroupName
      profileStatusAndTimestampAndUuid
      profileStatus
      profileType
      parentProfileUUID
      displayName
      metadata {
        createTimestamp
        deleteTimestamp
        updateTimestamp
        createdBy
        updatedBy
        deletedBy
        userPoolId
      }
      profile {
        typeOfBusiness
        currency
      }
    }
  }
`;
