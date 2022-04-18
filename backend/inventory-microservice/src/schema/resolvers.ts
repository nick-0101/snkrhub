export {};

// Clients
const Inventory = require('../models/inventoryModel');

// Types
import { 
  FetchUserInventoryItemsArgs,
  AddInventoryItemArgs, 
  DeleteInventoryItemArgs,
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
    // Create an inventory item
    addInventoryItem: async (parent: undefined, { inventoryItem }: AddInventoryItemArgs, context: ApolloContextData) => {
      // Add inventory item
      const newInventoryItem = await Inventory.create({ 
        user_id: inventoryItem.user_id, // replace with context.userId
        name: inventoryItem.name,
        styleid: inventoryItem.styleid,
        brand: inventoryItem.brand,
        colour: inventoryItem.colour,
        condition: inventoryItem.condition,
        shoesize: inventoryItem.shoesize,
        purchaseprice: inventoryItem.purchaseprice,
        tax: inventoryItem.tax,
        shipping: inventoryItem.shipping,
        purchasedate: inventoryItem.purchasedate,
        ordernumber: inventoryItem.ordernumber,
      });

      return { "id": newInventoryItem.id }
    },
    
    // Delete an inventory item
    deleteInventoryItem: async (parent: undefined, args: DeleteInventoryItemArgs, context: ApolloContextData) => {
      await Inventory.destroy({
        where: {
          id: args.id,
          user_id: args.userId
        }
      });

      return 
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