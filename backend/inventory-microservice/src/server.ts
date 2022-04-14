import { Request, Response } from 'express';
const express = require('express');
const http = require('http');

const app = express()
const httpServer = http.createServer(app);

// Apollo
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
const { buildSubgraphSchema } = require('@apollo/subgraph');

// Routes
var properties = require('../package.json');
app.get('/about', (req: Request, res: Response) => {
  var aboutInfo = {
    name: properties.name,
    version: properties.version,
  };
  res.json(aboutInfo);
});

interface User {
    id: string
    username: string
}

const typeDefs = gql`
extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key", "@shareable"])

  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;


const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" }
    }
  },
  User: {
    __resolveReference(user: User, { fetchUserById }: any){
      return fetchUserById(user.id)
    }
  }
};

// Start server
const startServer = async () => {
  // Start apollo
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Mount Apollo middleware here.
  server.applyMiddleware({ app });

  // Start express server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () =>
    console.log(`⚡️ [server]: Server is running on http://localhost:${PORT}`)
  );
};

startServer();