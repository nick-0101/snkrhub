const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const { readFileSync } = require('fs');

// const schemaString = readFileSync('./supergraph.graphql').toString();
// const supergraphSdl = gql` ${schemaString} `;

// Initialize an ApolloGateway instance and pass it
// the supergraph schema
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'Content', url: 'http://localhost:3000/graphql'},
      ],
    }),

});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

server.listen().then(() => {
  console.log(`🚀 Gateway ready `);
});