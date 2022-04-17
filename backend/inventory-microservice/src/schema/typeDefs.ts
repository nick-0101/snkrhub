export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String
  }
  
  type Mutation {
    addInventoryItem(inventoryItem: InventoryItemInput!): InventoryItemResponse!
  }

  type InventoryResponse {
    id: Int!
  }

  input InventoryItemInput {
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

  type InventoryItemResponse {
    id: String!
  }

`;

module.exports = {typeDefs}
