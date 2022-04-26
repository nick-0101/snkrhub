export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    fetchInventoryAnalytics: InventoryAnalytics!
    fetchInventoryValueRange(rangeInDays: Int!): [InventoryValueAnalytics]
  }

  type InventoryAnalytics {
    inventorycount: Int!,
    itemspend: Int!,
    inventorysold: Int!
    inventoryvalue: Int!
  }
  
  type InventoryValueAnalytics {
    inventoryvalue: Int!,
    createdAt: String!
  }

  type Mutation {
    updateAnalyticsForItemAdd(inventoryItem: InventoryAnalyticsItemAddInput!): String
    updateAnalyticsForItemDelete(inventoryItem: InventoryAnalyticsItemDelete!): String
  }

  input InventoryAnalyticsItemAddInput {
    purchaseprice: Int!,
  }

  input InventoryAnalyticsItemDelete {
    purchaseprice: Int!,
  }

`;

module.exports = {typeDefs}
