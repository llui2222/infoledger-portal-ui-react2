const amplifyAWSConfig = {
    Auth: {
        identityPoolId: 'us-east-1:be536160-a21f-4b38-9217-8055fc80317b',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_dnSXclPd6',
        userPoolWebClientId: '10cr20oqg53rjv0a9g1cp1dor6',
        mandatorySignIn: true,
    },
    appSync: {
        region: 'us-east-1',
        graphqlEndpoint: "https://vwmp54jovnhudaimxhnulbcfmq.appsync-api.us-east-1.amazonaws.com/graphql",
        authenticationType: "AMAZON_COGNITO_USER_POOLS",
        ClientDatabasePrefix: "ProfilesAPI_AMAZON_COGNITO_USER_POOLS",
        GraphQLApiId: "mzxy7e62xzby7ixfr5fakjpcta"
    }
};


export default amplifyAWSConfig;