const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

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
  user: {
    __resolveReference(user: User, { fetchUserById }: any){
      return fetchUserById(user.id)
    }
  }
};

// Start server
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

const PORT = process.env.PORT || 3001;
server.listen({ port: PORT }).then(() => {
  console.log(`⚡️ [inventory-microservice]: Inventory microservice is online`);
});