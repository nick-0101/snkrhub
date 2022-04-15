const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, externalSupergraphUpdateCallback } = require('@apollo/gateway');
const { watch, readFileSync } = require('fs');

// const schemaString = readFileSync("../supergraph.graphql").toString('utf-8')
// const testString = schemaString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
// const test = JSON.parse(testString); //No errors due to escaping

// console.log(test.data.core_schema)

// Initialize an ApolloGateway instance and pass it the supergraph schema
let supergraphUpdate;
const gateway = new ApolloGateway({
  async supergraphSdl({ update, healthCheck }: typeof externalSupergraphUpdateCallback) {
    // // create a file watcher
    // const watcher = watch('../supergraph.graphql');

    // // subscribe to file changes
    // watcher.on('change', async () => {
    //     // update the supergraph schema
    //     try {
    //         // Fetch & parse supergraph
    //         const schemaString = readFile("../supergraph.graphql", 'utf-8')
    //         const replaceNewLine = schemaString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    //         const updatedSupergraph = JSON.parse(replaceNewLine); // No errors due to escaping
       
    //         // optional health check update to ensure our services are responsive
    //         await healthCheck(updatedSupergraph);
            
    //         // update the supergraph schema
    //         update(updatedSupergraph);

    //     } catch (e) {
    //         // handle errors that occur during health check or while updating the supergraph schema 
    //         console.error(e);   
    //     }
    // });

    // Fetch inital schema
    const schemaString = readFileSync("../supergraph.graphql").toString('utf-8')
    const replaceNewLine = schemaString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    const supergraph = JSON.parse(replaceNewLine); // No errors due to escaping
    const gqlSuperGraph = gql`${supergraph.data.core_schema}`

    console.log(gqlSuperGraph)

    return {
        supergraphSdl: await supergraph,
        
        // cleanup is called when the gateway is stopped
        // async cleanup() {
        //   watcher.close();
        // }

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