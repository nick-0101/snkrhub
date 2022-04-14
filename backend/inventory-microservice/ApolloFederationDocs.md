## Apollo federation notes

Documentation and references for Apollo federation. Actual docs can be found here [https://www.apollographql.com/docs/federation](https://www.apollographql.com/docs/federation)

## Introduction & overview

Apollo federation allows you to create a gateway that combines multiple GraphQL apis.

In a federated architecture, individual graphql apis are called subgraphs, these subgraphs are then composed into a super grap. By querying the supergraph, clients can query all subgraphs at the same time.

A gateway serves as the public access point for your supergraph. It receives incoming GraphQL operations and distributes them across subgraphs. To clients, this looks exactly the same as querying any other GraphQL server—no special configuration is required.

## Supergraph schema composition

To create a supergraph, you use a process called composition. Composition takes all of your subgraph schemas and combines them into one schema for your gateway.

As a best practise, the gateway does not compose its own supergraph schema. Instead, a separate process composes the schema and provides it to the gateway. This helps improve reliability and reduce downtime when you make changes to a subgraph.

To create a gateway, refer to this: [https://www.apollographql.com/docs/federation/quickstart/setup#2-create-a-new-gateway-project](https://www.apollographql.com/docs/federation/quickstart/setup#2-create-a-new-gateway-project)

## Federated Schemas

### Overview

![diagram](https://i.ibb.co/5W3RsdR/federatedgraph.jpg)

- Subgraph schemas. Each subgraph has a distinct schema that indicates which types and fields of your composed supergraph it can resolve.

  - These are the only schemas that you can define manually.

- Supergraph schema. This schema combines all of the types and fields from your subgraph schemas, plus some Federation-specific information that tells your gateway which subgraphs can resolve which fields.

  - This schema is the result of performing composition on your collection of subgraph schemas.

- API schema. This schema is like the supergraph schema, but it omits types, fields, and directives that are considered "machinery" and are not part of your public API (this includes Federation-specific information).
  - This is the schema that your gateway exposes to clients, who don't need to know internal implementation details about your graph.

For more info on Subgraph Schemas, refer to: [https://www.apollographql.com/docs/federation/federated-types/overview#api-schema](https://www.apollographql.com/docs/federation/federated-types/overview#api-schema)
