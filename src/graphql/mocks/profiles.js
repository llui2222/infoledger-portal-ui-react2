const { gql } = require('apollo-server');

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Address {
    city: String
    country: String
    phoneNumber: String
    postalCode: String
    streetAddress: String
  }

  type Mutation {
    deleteProfile(profileId: ID!): ProfileOutput
    saveProfile(profile: ProfileInput!): ProfileOutput
    updateProfile(profile: ProfileInput!, profileId: ID!): ProfileOutput
  }

  type ProfileOutput {
    billingAddress: Address
    businessAddress: Address
    createTimestamp: String
    createdBy: String
    currency: String
    deleteTimestamp: String
    deletedBy: String
    displayName: String
    infoledgerClientType: InfoLedgerClientType
    parentProfileId: String
    profileId: ID
    profileStatus: String
    profileType: ProfileType
    typeOfBusiness: TypeOfBusiness
    updateTimestamp: String
    updatedBy: String
    userPoolId: String
  }

  type Query {
    allProfiles(limit: Int): [ProfileOutput]
    getProfile(profileId: ID!): ProfileOutput
  }

  type Schema {
    mutation: Mutation
    query: Query
  }

  enum InfoLedgerClientType {
    CLIENT_SIDE
    INVESTMENT_SIDE
  }

  enum ProfileType {
    ACCOUNT
    COMPANY
  }

  enum TypeOfBusiness {
    ASSET_OWNER
    SERVICE_COMPANY
  }

  input AddressInput {
    city: String
    country: String
    phoneNumber: String
    postalCode: String
    streetAddress: String
  }

  input ProfileInput {
    billingAddress: AddressInput
    businessAddress: AddressInput
    currency: String
    infoledgerClientType: InfoLedgerClientType
    parentProfileId: String
    profileName: String!
    profileType: ProfileType!
    typeOfBusiness: TypeOfBusiness
  }
`;

export default typeDefs;