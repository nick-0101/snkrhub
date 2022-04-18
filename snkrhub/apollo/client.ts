import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'localhost:3000/graphql',
  cache: new InMemoryCache(),
//   headers: {
//     authorization: 'test',
//   }
});
