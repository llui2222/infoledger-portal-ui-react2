import { ApolloServer } from 'apollo-server';
import typeDefs from "./mocks/profiles";

const server = new ApolloServer({
    typeDefs,
    mocks: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
