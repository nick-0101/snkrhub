## SnkrHub Backend Architecture

Documentation for the design of the backend for SnkrHub.

## Overview

The SnkrHub app backend uses the microservice architecture. It will have a microservice for each major function of the app (ie. Analytics microservice, Inventory microservice, Orders microservice, etc).

The backend uses the following technologies:

- Expressjs (Web framework)
- Postgresql (Database)
- Apollo GraphQL (Api)
- Docker (Environment)
- Nginx (Web server)
- HAproxy (Load balancer)
- Firebase (User auth)
- Kubernetes (Container orchestration)

![backend architecture](https://i.ibb.co/KXcX550/26236-F39-DCB3-43-B1-BBBC-5-F87753-EE030.jpg 'backend architecture')

## Why GraphQL

GraphQL is being used as a central service that all the clients will talk too. GraphQL lets me provide a single api for the frontend application while allowing joins across data from different services. There will be 1 GraphQL schema that acts as api gateway.

Refer to this stackoverflow answer: [https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture](https://stackoverflow.com/questions/38071714/when-and-how-to-use-graphql-with-microservice-architecture)

To actually merge all the microservices in one place, refer to this article: [https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602](https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602)
