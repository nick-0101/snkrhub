export {};

// Clients
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');

// Types
import { 
  UpdateInventoryAnalyticsArgs,
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
            itemspend: 0.00,
            inventorysold: 0,
            inventoryvalue: 0.00
          },
        );

        console.log(userInventoryDefaultAnalytics)

        return {
          inventoryCount: userInventoryDefaultAnalytics.inventorycount,
          itemSpend: userInventoryDefaultAnalytics.itemspend,
          inventorySold: userInventoryDefaultAnalytics.inventorysold,
          inventoryValue: userInventoryDefaultAnalytics.inventoryvalue
        }
      } else {
        return userInventoryAnalytics[0]
      }
    }
  },
  Mutation: {
    updateAnalyticsForItemAdd: async (parent: undefined, { inventoryItem }: UpdateInventoryAnalyticsArgs, context: ApolloContextData) => {      
      // Increment user inventory stats
      await InventoryAnalytics.increment({
        inventorycount: 1,
        itemspend: inventoryItem.purchaseprice,  
        inventoryvalue: inventoryItem.purchaseprice - (inventoryItem.shipping + inventoryItem.tax)
      }, { 
        where: {
          user_id: context.userId
        } 
      })

      // Insert row into inventory value table
      await InventoryValue.create({ 
        user_id: context.userId,
        inventoryvalue: inventoryItem.purchaseprice
      });
    
      return 'updated stats'
    }
  }
};

module.exports = {resolvers}