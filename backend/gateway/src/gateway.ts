const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, externalSupergraphUpdateCallback } = require('@apollo/gateway');
const { watch, readFileSync } = require('fs');

// Initialize an ApolloGateway instance and pass it the supergraph schema
let supergraphUpdate;
const gateway = new ApolloGateway({
  async supergraphSdl({ update, healthCheck }: typeof externalSupergraphUpdateCallback) {
    // create a file watcher
    const watcher = watch('../supergraph.graphql');

    // subscribe to file changes
    watcher.on('change', async () => {
        // update the supergraph schema
        try {
            console.log(`📦 Rebuilding supergraph `);
            const updatedSupergraph = readFileSync("../supergraph.graphql", 'utf16le')
        
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
      supergraphSdl: await readFileSync('../supergraph.graphql', 'utf16le'),

      // cleanup is called when the gateway is stopped
        async cleanup() {
          watcher.close();
        }
    }

  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

server.listen().then(() => {
  console.log(`🚀 Gateway ready `);
});