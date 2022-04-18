export {};

// Clients
const Inventory = require('../models/inventoryModel');

// Types
import { 
  FetchUserInventoryItemsArgs,
  AddInventoryItemArgs, 
  ApolloContextData 
} from '../types';

const resolvers = {
  Query: {
    fetchUserInventoryItems: async(
      parent: undefined, 
      args: FetchUserInventoryItemsArgs,
      context: ApolloContextData
    ) => {
      return { id: "1", username: "@ava" }
    }
  },
  Mutation: {
    addInventoryItem: async (
      parent: undefined, 
      { inventoryItem }: AddInventoryItemArgs, 
      context: ApolloContextData
    ) => {
      // Add inventory item
      const newInventoryItem = await Inventory.create(inventoryItem);
      return {"id": newInventoryItem.id }
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