import { Request } from 'express'
const express = require('express');
const http = require('http');
const db = require('./clients/postgres');

// Apollo
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloError } = require('apollo-server-errors');
const { resolvers } = require('./schema/resolvers')
const { typeDefs } = require('./schema/typeDefs')

// Types
export interface ApolloContextReq {
  req: Request;
};

const app = express()
const httpServer = http.createServer(app);

// Postgres database connection
const connectWithRetry = () => {
  // Test if the connection is ok
  try {
    db.authenticate();
    console.log('Connection has been established successfully.');

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry();

// Start server
const startServer = async () => {
  // Start apollo
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async({ req }: ApolloContextReq) => {
      // Extract user id
      const userId = req.headers['user-id']

      return { userId };
    },
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