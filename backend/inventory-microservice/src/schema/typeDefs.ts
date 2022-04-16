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
    addInventoryItem(name: String!): Test!
  }

  type Test {
    name: String!
  }

  type InventoryItem {
    id: Int!,
    user_id: String!,
    name: String!,
    styleId: String,
    brand: String,
    colour: String,
    condition: String,
    shoeSize: Int,
    purchasePrice: Int!,
    tax: Int,
    shipping: Int,
    purchaseDate: String!,
    orderNumber: Int
  }

`;

module.exports = {typeDefs}
