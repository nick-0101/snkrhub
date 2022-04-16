const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, externalSupergraphUpdateCallback, IntrospectAndCompose } = require('@apollo/gateway');
const { watch, readFileSync } = require('fs');
const waitOn = require('wait-on')

// Initialize an ApolloGateway instance and pass it the supergraph schema
let supergraphUpdate;
const gateway = new ApolloGateway({
  // async supergraphSdl({ update, healthCheck }: typeof externalSupergraphUpdateCallback) {
  //   // create a file watcher
  //   const watcher = watch('../supergraph.graphql');

  //   // subscribe to file changes
  //   watcher.on('change', async () => {
  //     // update the supergraph schema
  //     try {
  //       console.log(`📦 [gateway]: Rebuilding supergraph `);
  //       const updatedSupergraph = readFileSync("../supergraph.graphql", 'utf16le')
    
  //       // optional health check update to ensure our services are responsive
  //       await healthCheck(updatedSupergraph);
        
  //       // update the supergraph schema
  //       update(updatedSupergraph);
  //     } catch (e) {
  //       // handle errors that occur during health check or while updating the supergraph schema 
  //       console.error(e);   
  //     }
  //   });

  //   // Fetch inital schema
  //   supergraphUpdate = update;
  //   return {
  //     supergraphSdl: await readFileSync('../supergraph.graphql', 'utf16le'),

  //     // cleanup is called when the gateway is stopped
  //     async cleanup() {
  //       watcher.close();
  //     }
  //   }
  // },
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'inventory', url: 'http://localhost:3001/graphql' },
    ],
  }),
});

const options = {
  resources: ['tcp:3001'],
}


// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

const PORT = process.env.PORT || 3000;

// waitOn(options).then(() => {
//   server.listen({ port: PORT }).then(() => {
//     console.log(`⚡️ [gateway]: Gateway is online at http://localhost:${PORT}/graphql`);
//   });
// }).catch((err: any) => console.log(err)) 

server.listen({ port: PORT }).then(() => {
    console.log(`⚡️ [gateway]: Gateway is online at http://localhost:${PORT}/graphql`);
  });