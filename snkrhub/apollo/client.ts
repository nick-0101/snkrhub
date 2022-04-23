import { ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'https://b9b6-74-12-56-214.ngrok.io/graphql',
  cache: new InMemoryCache(),
});
