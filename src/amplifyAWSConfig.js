const amplifyAWSConfig = {
    Auth: {
        identityPoolId: 'us-east-1:be536160-a21f-4b38-9217-8055fc80317b',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_6AKQ80MAZ',
        userPoolWebClientId: 'bm0hs9m4anecon2sjnmi169dk',
        mandatorySignIn: true,
    },
    appSync: {
        region: 'us-east-1',
        graphqlEndpoint: "https://vwmp54jovnhudaimxhnulbcfmq.appsync-api.us-east-1.amazonaws.com/graphql",
        authenticationType: "AMAZON_COGNITO_USER_POOLS",
    }
};


export default amplifyAWSConfig;