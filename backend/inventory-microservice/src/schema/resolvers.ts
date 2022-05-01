export {};

// Clients
const Inventory = require('../models/inventoryModel');

// Types
import { 
  FetchUserInventoryItemsArgs,
  AddInventoryItemArgs, 
  DeleteInventoryItemArgs,
  MarkInventoryItemSoldArgs,
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
          user_id: context.userId,
          markedsold: false
        },
        // Skip x instances 
        offset: args.offset,
        // fetch the x after that 
        limit: args.limit,
        // order by creation
        order: [['createdAt', 'DESC']]
      })

      return usersInventoryItems
    }
  },
  Mutation: {
    // Create an inventory item
    addInventoryItem: async (parent: undefined, { inventoryItem }: AddInventoryItemArgs, context: ApolloContextData) => {
      // Add inventory item
      const newInventoryItem = await Inventory.create({ 
        user_id: context.userId, // replace with context.userId
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
        markedsold: false
      });

      return { "id": Number(newInventoryItem.id) }
    },
    
    // Delete an inventory item
    deleteInventoryItem: async (parent: undefined, args: DeleteInventoryItemArgs, context: ApolloContextData) => {
      await Inventory.destroy({
        where: {
          id: args.itemId,
          user_id: context.userId
        }
      });

      return { "id": args.itemId }
    },

    // Marks an inventory item as sold
    markInventoryItemSold: async(parent: undefined, args: MarkInventoryItemSoldArgs, context: ApolloContextData) => {
      await Inventory.update({ markedsold: true }, {
        where: {
          id: args.itemId,
          user_id: context.userId
        }
      });

      return { "id": args.itemId }
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