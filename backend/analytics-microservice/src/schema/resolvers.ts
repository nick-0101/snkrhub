export {};

// Clients
// const Inventory = require('../models/inventoryModel');

// Types
// import { 
//   FetchUserInventoryItemsArgs,
//   AddInventoryItemArgs, 
//   DeleteInventoryItemArgs,
//   ApolloContextData 
// } from '../types';

const resolvers = {
  Query: {
    analyticsTest: () => {
      return 'test'
    }
  },
  //  https://www.apollographql.com/docs/federation/entities#2-define-a-reference-resolver
  // user: {
  //   __resolveReference(user: User, { fetchUserById }: any){
  //     return fetchUserById(user.id)
  //   }
  // }
};

module.exports = {resolvers}