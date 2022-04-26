export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    fetchInventoryAnalytics: InventoryAnalytics!
    fetchInventoryValueRange(rangeInDays: Int!): [InventoryValueAnalytics]
  }

  type InventoryAnalytics {
    inventorycount: Int!,
    netincome: Int!,
    inventorysold: Int!
    inventoryvalue: Int!
  }
  
  type InventoryValueAnalytics {
    inventoryvalue: Int!,
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
