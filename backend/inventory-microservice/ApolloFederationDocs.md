## Apollo federation notes

Documentation and references for Apollo federation. Actual docs can be found here [https://www.apollographql.com/docs/federation](https://www.apollographql.com/docs/federation)

## Introduction & overview

Apollo federation allows you to create a gateway that combines multiple GraphQL apis.

In a federated architecture, individual graphql apis are called subgraphs, these subgraphs are then composed into a super grap. By querying the supergraph, clients can query all subgraphs at the same time.

A gateway serves as the public access point for your supergraph. It receives incoming GraphQL operations and distributes them across subgraphs. To clients, this looks exactly the same as querying any other GraphQL server—no special configuration is required.

## Supergraph schema composition

To create a supergraph, you use a process called composition. Composition takes all of your subgraph schemas and combines them into one schema for your gateway.

As a best practise, the gateway does not compose its own supergraph schema. Instead, a separate process composes the schema and provides it to the gateway. This helps improve reliability and reduce downtime when you make changes to a subgraph.
