export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    fetchUserInventoryItems(offset: Int!, limit: Int!, userId: String!): [InventoryItem]
  }

  type InventoryItem {
    id: Int!,
    user_id: String!,
    name: String!,
    styleid: String,
    brand: String,
    colour: String,
    condition: String,
    shoesize: Float,
    purchaseprice: Int!,
    tax: Int,
    shipping: Int,
    purchasedate: String!,
    ordernumber: String
  }
  
  type Mutation {
    addInventoryItem(inventoryItem: InventoryItemInput!): InventoryItemResponse!
    deleteInventoryItem(itemId: Int!): InventoryItemResponse!
  }

  input InventoryItemInput {
    user_id: String!,
    name: String!,
    styleid: String,
    brand: String,
    colour: String,
    condition: String,
    shoesize: Float,
    purchaseprice: Int!,
    tax: Int,
    shipping: Int,
    purchasedate: String!,
    ordernumber: String
  }

  type InventoryItemResponse {
    id: Int!
  }

`;

module.exports = {typeDefs}
