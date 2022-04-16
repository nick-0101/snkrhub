const express = require('express');
const http = require('http');
var cors = require('cors')
// const postgresDb = require('./clients/postgres');
const firebaseApp = require("./clients/firebase")

// Apollo
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { resolvers } = require('./schema/resolvers')
const { typeDefs } = require('./schema/typeDefs')

const app = express()
const httpServer = http.createServer(app);

// Middlware
app.use(cors())

// Postgres database connection
// const connectWithRetry = () => {
//   // Test if the connection is ok
//   try {
//     postgresDb.authenticate();
//     console.log('Connection has been established successfully.');

//     return postgresDb;
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     setTimeout(connectWithRetry, 5000);
//   }
// };
// connectWithRetry();

// Firebase
firebaseApp()

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