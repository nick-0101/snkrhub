export {};

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    analyticsTest: String
  }

`;

module.exports = {typeDefs}
