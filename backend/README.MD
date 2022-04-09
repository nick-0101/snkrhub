## SnkrHub Backend Architecture

Documentation for the design of the backend for SnkrHub.

## Overview

The SnkrHub app backend uses the microservice architecture. We will have a microservice for each major function of the app (ie. Analytics microservice, Inventory microservice, Orders microservice, etc).

The backend uses the following technologies:

- Expressjs (Web framework)
- Postgresql (Database)
- GraphQL (Api gateway)
- Docker (Environment)
- Nginx (Web server)
- HAproxy (Load balancer)
- Firebase (User auth)
- Kubernetes (Container orchestration)

## Why GraphQL

GraphQL is being used as a central service that all the clients will talk too. GraphQL lets me provide a single api for the frontend application while allowing joins across data from different services. It pretty much acts the api gateway.

Refer to this stackoverflow answer: [https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture](https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture)
