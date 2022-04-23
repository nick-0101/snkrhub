import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";

// Types
import { InventoryData } from '../screens/AppScreens/types';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        fetchUserInventoryItems: offsetLimitPagination(),
      },
    }
  },
});

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache
});
