// Apollo
const { ApolloServer, GraphQLResponse } = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');
const { ApolloGateway, externalSupergraphUpdateCallback, RemoteGraphQLDataSource} = require('@apollo/gateway');
const { watch, readFileSync } = require('fs');
require('dotenv').config()

// Clients
const firebaseApp = require("./clients/firebase")

// Controllers
const { validateUserToken } = require('./controllers/validateUserToken.controller')

// Types
import { ApolloRequest, ApolloContext, ApolloBuildService } from './types'

// Firebase client init
firebaseApp()

// Initialize an ApolloGateway instance and pass it the supergraph schema
let supergraphUpdate;
let superGraphpath: string;

// Check if gateway is running in kubenetes
const kubernetesHost = process.env.APOLLO_KUBERNETES_HOST == "true" ? true : false;

if (kubernetesHost){
  superGraphpath = "/etc/config/supergraph.graphql"
  console.log('Apollo gateway running on kubernetes...');
} else {
  superGraphpath = "../supergraph.graphql"
  console.log('Apollo gateway running locally...');
}

// Initalize apollo gateway
const gateway = new ApolloGateway({
  async supergraphSdl({ update, healthCheck }: typeof externalSupergraphUpdateCallback) {
    // create a file watcher
    const watcher = watch(superGraphpath);

    // subscribe to file changes
    watcher.on('change', async () => {
      // update the supergraph schema
      try {
        console.log(`📦 [gateway]: Rebuilding supergraph `);
        const updatedSupergraph = readFileSync(superGraphpath, 'utf16le')
    
        // optional health check update to ensure our services are responsive
        await healthCheck(updatedSupergraph);
        
        // update the supergraph schema
        update(updatedSupergraph);
      } catch (e) {
        // handle errors that occur during health check or while updating the supergraph schema 
        console.error(e);   
      }
    });

    // Fetch inital schema
    supergraphUpdate = update;
    return {
      supergraphSdl: await readFileSync(superGraphpath, 'utf16le'),

      // cleanup is called when the gateway is stopped
      async cleanup() {
        watcher.close();
      }
    }
  },
  buildService({ name, url }: ApolloBuildService) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }: ApolloContext) {
        // pass the user's id from the context to underlying services as a header called `authorization`
        request.http.headers.set('user-id', context.userId ? context.userId : null);
      },
    });
  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ response }: typeof GraphQLResponse) {
            // Append header to outgoing response headers
            response.http.headers.set(
              'X-Powered-By', 'Cats on keyboards'
            );
          }
        };
      }
    }
  ],
  context: async({ req }: ApolloRequest) => {
    const token = req.headers.authorization || '';

    // Verify token
    const res = await validateUserToken(token)

    if(res.code) {
      throw new ApolloError(res.message, res.code);
    }

    // Add the user ID to the context
    return { userId: res };
  },
});

const PORT = process.env.PORT || 3000;
server.listen({ port: PORT }).then(() => {
    console.log(`⚡️ [gateway]: Gateway is online at http://localhost:${PORT}/graphql`);
  });