export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    fetchInventoryAnalytics: InventoryAnalytics!
    fetchInventoryValueRange(rangeInDays: Int!): [InventoryValueAnalytics]
  }

  type InventoryAnalytics {
    inventoryCount: Int!,
    netIncome: Int!,
    inventorySold: Int!
    inventoryValue: [InventoryValueAnalytics]
  }

  type InventoryValueAnalytics {
    inventoryValue: Int!,
    createdAt: String!
  }

  type Mutation {
    updateUserInventoryAnalytics(inventoryItem: InventoryAnalyticsItemInput!): String
  }

  input InventoryAnalyticsItemInput {
    purchaseprice: Int!,
    tax: Int,
    shipping: Int,
    purchasedate: String!,
  }

`;

module.exports = {typeDefs}
