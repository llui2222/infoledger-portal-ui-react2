/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($owner: String!) {
    onCreateContact(owner: $owner) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($owner: String!) {
    onUpdateContact(owner: $owner) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($owner: String!) {
    onDeleteContact(owner: $owner) {
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
