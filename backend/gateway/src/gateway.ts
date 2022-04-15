const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const { readFileSync } = require('fs');
const path = require("path");

const schemaString = readFileSync("../supergraph.graphql").toString()
// const supergraphSdl = gql` ${schemaString} `;

console.log(schemaString)

// // Initialize an ApolloGateway instance and pass it
// // the supergraph schema
// const gateway = new ApolloGateway({
//   supergraphSdl,
// });

// // Pass the ApolloGateway to the ApolloServer constructor
// const server = new ApolloServer({
//   gateway,
// });

// server.listen().then(() => {
//   console.log(`🚀 Gateway ready `);
// });