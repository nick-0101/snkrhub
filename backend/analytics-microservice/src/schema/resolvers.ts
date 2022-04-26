export {};

// Clients
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');

// Types
import { 
  ApolloContextData 
} from '../types';

const resolvers = {
  Query: {
    fetchInventoryAnalytics: async(parent: undefined, args: undefined, context: ApolloContextData) => {
      // Fetch users inventory analytics based on user_id
      const userInventoryAnalytics = await InventoryAnalytics.findAll({
        where: {
          user_id: context.userId
        },
        attributes: { exclude: ['id', 'user_id'] },
        raw: true
      })

      if(!userInventoryAnalytics || !userInventoryAnalytics.length) {
        // If no record exists in inventory_analytics table, then create a document with base stats
        const userInventoryDefaultAnalytics = await InventoryAnalytics.create(
          { 
            user_id: context.userId,
            inventorycount: 0,
            netincome: 0.00,
            inventorysold: 0,
            inventoryvalue: 0.00
          },
        );

        console.log(userInventoryDefaultAnalytics)

        return {
          inventoryCount: userInventoryDefaultAnalytics.inventorycount,
          netIncome: userInventoryDefaultAnalytics.netincome,
          inventorySold: userInventoryDefaultAnalytics.inventorysold,
          inventoryValue: userInventoryDefaultAnalytics.inventoryvalue
        }
      } else {
        return userInventoryAnalytics[0]
      }
    }
  },
  // Mutation: {
  //   // Update 
  //   updateUserInventoryAnalytics: async (parent: undefined, args: DeleteInventoryItemArgs, context: ApolloContextData) => {
  //     // await Inventory.destroy({
  //     //   where: {
  //     //     id: args.itemId,
  //     //     user_id: context.userId
  //     //   }
  //     // });

  //     // return { "id": args.itemId }
  //   }
  // }
};

module.exports = {resolvers}