export {};

const dayjs = require('dayjs')

// Clients
const { Op } = require("sequelize");
const db = require('../clients/postgres');
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');


// Types
import { 
  UpdateInventoryAnalyticsArgs,
  ApolloContextData,
  FetchInventoryValueRangeArgs
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

      // If no record exists in inventory_analytics table, then create a document with base stats
      if(!userInventoryAnalytics || !userInventoryAnalytics.length) {
        const userInventoryDefaultAnalytics = await InventoryAnalytics.create(
          { 
            user_id: context.userId,
            inventorycount: 0,
            itemspend: 0.00,
            inventorysold: 0,
            inventoryvalue: 0.00
          },
        );
        return {
          inventoryCount: userInventoryDefaultAnalytics.inventorycount,
          itemSpend: userInventoryDefaultAnalytics.itemspend,
          inventorySold: userInventoryDefaultAnalytics.inventorysold,
          inventoryValue: userInventoryDefaultAnalytics.inventoryvalue
        }
      } else {
        // Return user stats
        return userInventoryAnalytics[0]
      }
    }, 
    fetchInventoryValueRange: async(parent: undefined, args: FetchInventoryValueRangeArgs, context: ApolloContextData) => {
      // Fetch documents based on date range provided
      switch (args.rangeInDays) {
        case 7:
          const sevenDayValueRange = await InventoryValue.findAll({
            where: {
              user_id: context.userId,
              createdAt: {
                [Op.between]: [
                  dayjs().subtract(1, 'day').locale('en').format("YYYY-MM-DD"), // current date
                  dayjs().add(7, 'day').locale('en').format("YYYY-MM-DD") // 7 days from now
                ]
              }
            }
          });

          return sevenDayValueRange
        
        case 30:
          const thirtyDayValueRange = await InventoryValue.findAll({
            where: {
              user_id: context.userId,
              createdAt: {
                [Op.between]: [
                  dayjs().subtract(1, 'day').locale('en').format("YYYY-MM-DD"), // current date
                  dayjs().add(30, 'day').locale('en').format("YYYY-MM-DD") // 30 days from now
                ]
              }
            }
          });

          return thirtyDayValueRange
         
        case 90:
          const ninetyDayValueRange = await InventoryValue.findAll({
            where: {
              user_id: context.userId,
              createdAt: {
                [Op.between]: [
                  dayjs().subtract(1, 'day').locale('en').format("YYYY-MM-DD"), // current date
                  dayjs().add(90, 'day').locale('en').format("YYYY-MM-DD") // 90 days from now
                ]
              }
            }
          });

          return ninetyDayValueRange

        case Infinity:
          const allRange = await InventoryValue.findAll({
            where: {
              user_id: context.userId,
            }
          });

          return allRange
        default:
          return 'invalid range'
      }
    }
  },
  Mutation: {
    updateAnalyticsForItemAdd: async (parent: undefined, { inventoryItem }: UpdateInventoryAnalyticsArgs, context: ApolloContextData) => {      
      // Sequeliuze transaction
      const t = await db.transaction();
      
      try {
        // Increment user inventory stats
        await InventoryAnalytics.increment({
          inventorycount: 1,
          itemspend: inventoryItem.purchaseprice,  
          inventoryvalue: inventoryItem.purchaseprice
        }, { 
          where: {
            user_id: context.userId
          } 
        }, { transaction: t })
  
        // Insert row into inventory value table
        await InventoryValue.create({ 
          user_id: context.userId,
          inventoryvalue: inventoryItem.purchaseprice
        }, { transaction: t });

        // Commit the transaction.
        await t.commit();
      } catch (error) {
        await t.rollback();
      }

    
      return 'updated stats'
    },
    updateAnalyticsForItemDelete: async (parent: undefined, { inventoryItem }: UpdateInventoryAnalyticsArgs, context: ApolloContextData) => {      
      // Sequeliuze transaction
      const t = await db.transaction();

      try {
        // Decrement user inventory stats
        await InventoryAnalytics.increment({
          inventorycount: -1,
          itemspend: -inventoryItem.purchaseprice,  
          inventoryvalue: -inventoryItem.purchaseprice
        }, { 
          where: {
            user_id: context.userId
          } 
        }, { transaction: t })

        // Find row with matching purchase price in inventory value table
        const inventoryValueRow = await InventoryValue.findAll({
          limit: 1,
          where: {
            user_id: context.userId
          },
          raw: true,
          order: [ [ 'id', 'DESC' ]],
        }, { transaction: t });

        // Delete row from inventory value
        await InventoryValue.destroy({
          where: {
            user_id: context.userId,
            inventoryvalue: inventoryValueRow[0].inventoryvalue
          }
        }, { transaction: t });

        // Commit the transaction.
        await t.commit();
      } catch (error) {
        await t.rollback();
      }
    
      return 'updated stats'
    }
    
  }
};

module.exports = {resolvers}