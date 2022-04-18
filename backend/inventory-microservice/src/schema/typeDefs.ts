export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  // Fetch users inventory items   
  
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
    shoesize: Int,
    purchaseprice: Int!,
    tax: Int,
    shipping: Int,
    purchasedate: String!,
    ordernumber: String
  }

  // Add inventory item
  
  type Mutation {
    addInventoryItem(inventoryItem: InventoryItemInput!): InventoryItemResponse!
  }

  input InventoryItemInput {
    user_id: String!,
    name: String!,
    styleid: String,
    brand: String,
    colour: String,
    condition: String,
    shoesize: Int,
    purchaseprice: Int!,
    tax: Int,
    shipping: Int,
    purchasedate: String!,
    ordernumber: String
  }

  type InventoryItemResponse {
    id: String!
  }

`;

module.exports = {typeDefs}
