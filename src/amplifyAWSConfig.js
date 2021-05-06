const amplifyAWSConfig = {
    Auth: {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        identityPoolId: 'us-east-1:be536160-a21f-4b38-9217-8055fc80317b',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_Gnn0tuS0V',
        userPoolWebClientId: '1pt0tjf860ftermo4t7u7j2rp2',
        mandatorySignIn: true,
    },
    appSync: {
        region: 'us-east-1',
        graphqlEndpoint: "https://vwmp54jovnhudaimxhnulbcfmq.appsync-api.us-east-1.amazonaws.com/graphql",
        // graphqlEndpoint: "http://localhost:4000/",
        authenticationType: "AMAZON_COGNITO_USER_POOLS",
    }
};


export default amplifyAWSConfig;