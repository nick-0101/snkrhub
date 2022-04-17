export {};

// Clients
const db = require('../clients/postgres');

// Types
import { AddInventoryItemArgs, ApolloContextData } from '../types';

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" }
    }
  },

  Mutation: {
    addInventoryItem: async (args: AddInventoryItemArgs, context: ApolloContextData) => {
      // Add inventory item


      return {"id": 'item id' }
    },  
  },

  //  https://www.apollographql.com/docs/federation/entities#2-define-a-reference-resolver
  // user: {
  //   __resolveReference(user: User, { fetchUserById }: any){
  //     return fetchUserById(user.id)
  //   }
  // }
};

module.exports = {resolvers}