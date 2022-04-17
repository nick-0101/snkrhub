import { Request } from 'express';
const { GraphQLRequest } = require('apollo-server');

// Apollo
export interface ApolloRequest {
  req: Request;
}

export interface ApolloContext {
  request: typeof GraphQLRequest
  context: ApolloContextData
}

export interface ApolloContextData {
    userId: string
}

export interface ApolloBuildService {
  name: string;
  url: (mesg: string) => void
}