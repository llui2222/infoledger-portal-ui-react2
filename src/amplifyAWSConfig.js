const amplifyAWSConfig = {
    Auth: {
        identityPoolId: 'us-east-1:fbb1e94b-695d-402d-a2d3-3460731caba3',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_dnSXclPd6',
        userPoolWebClientId: '10cr20oqg53rjv0a9g1cp1dor6',
        mandatorySignIn: true,
    },
    appSync: {
        region: 'us-east-1',
        graphqlEndpoint: "https://hlbtkdk34fhzrmyyvtmbjszgkq.appsync-api.us-east-1.amazonaws.com/graphql",
        authenticationType: "AMAZON_COGNITO_USER_POOLS"
    }
};


export default amplifyAWSConfig;
