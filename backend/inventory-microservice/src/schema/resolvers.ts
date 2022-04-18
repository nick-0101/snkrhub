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
    fetchUserInventoryItems: async (
      parent: undefined, 
      args: FetchUserInventoryItemsArgs,
      context: ApolloContextData
    ) => {
      // Fetch all inventory items with matching user id & paginate
      const usersInventoryItems = await Inventory.findAll({ 
        where: {
          user_id: args.userId,
        },
        // Skip x instances 
        offset: args.offset,
        // fetch the x after that 
        limit: args.limit 
      })

      return usersInventoryItems
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
      return { "id": newInventoryItem.id }
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