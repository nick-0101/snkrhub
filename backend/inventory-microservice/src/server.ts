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

interface Content {
    id: string
    title: string
    year: string
}

const contents = [
  { id: "1", title: "Batman", year: "1989" },
  { id: "2", title: "Batman Returns", year: "1992" },
  { id: "3", title: "Batman: The Animated Series", year: "1992" },
];

const typeDefs = gql`
extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key", "@shareable"])
        
  type Query {
    contents: [Content]
  }
  type Content @key(fields: "id") {
    id: ID!
    title: String
    year: String
  }
`;

const resolvers = {
  Query: {
    contents() {
      return contents;
    },
  },
  content: {
    __resolveReference(content: Content) {
      return contents.find(c => c.id === content.id);
    },
  },
};

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
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`⚡️ [server]: Server is running on http://localhost:${PORT}`)
  );
};

startServer();