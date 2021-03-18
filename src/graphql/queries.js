/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      ownerCognitoGroupId
      statusIdTimestamp
      contactCognitoGroupId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerCognitoGroupId
        statusIdTimestamp
        contactCognitoGroupId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const contactsByOwnerCognitoGroupId = /* GraphQL */ `
  query ContactsByOwnerCognitoGroupId(
    $ownerCognitoGroupId: ID
    $statusIdTimestamp: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactsByOwnerCognitoGroupId(
      ownerCognitoGroupId: $ownerCognitoGroupId
      statusIdTimestamp: $statusIdTimestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerCognitoGroupId
        statusIdTimestamp
        contactCognitoGroupId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const contactsContactCognitoGroupId = /* GraphQL */ `
  query ContactsContactCognitoGroupId(
    $contactCognitoGroupId: ID
    $statusIdTimestamp: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactsContactCognitoGroupId(
      contactCognitoGroupId: $contactCognitoGroupId
      statusIdTimestamp: $statusIdTimestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerCognitoGroupId
        statusIdTimestamp
        contactCognitoGroupId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
