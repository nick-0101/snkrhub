import { Request, Response } from 'express';
const express = require('express');
const http = require('http');

// Apollo
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { resolvers } = require('./schema/resolvers')
const { typeDefs } = require('./schema/typeDefs')

const app = express()
const httpServer = http.createServer(app);

// Start server
const startServer = async () => {
  // Start apollo
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start()

  // Mount Apollo middleware here.
  server.applyMiddleware({ app });

  // Start express server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () =>
    console.log(`⚡️ [server]: Server is running on http://localhost:${PORT}`)
  );
};

startServer();