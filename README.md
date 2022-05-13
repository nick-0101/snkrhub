<div align="center">

  <h1>Snkrhub - Track, manage, and organize your sneaker reselling</h1>

<!-- Badges -->
<p>
  <!-- Ci status -->
  <a href="https://github.com/phoenixbeats01/snkrhub/actions/workflows/frontend.yml">
    <img src="https://github.com/phoenixbeats01/snkrhub/actions/workflows/frontend.yml/badge.svg" alt="SnkrHub Frontend CI" />
  </a>
  <a href="https://github.com/phoenixbeats01/snkrhub/actions/workflows/backend.yml">
    <img src="https://github.com/phoenixbeats01/snkrhub/actions/workflows/backend.yml/badge.svg?branch=master" alt="SnkrHub Backend CI" />
  </a>
  
  <br />

  <!-- Repo info -->
  <a href="https://github.com/phoenixbeats01/snkrhub">
    <img src="https://img.shields.io/github/stars/phoenixbeats01/snkrhub?style=flat-square" alt="stars" />
  </a>
  <a href="https://github.com/phoenixbeats01/snkrhub/network/members">
    <img src="https://img.shields.io/github/forks/phoenixbeats01/snkrhub?style=flat-square" alt="forks" />
  </a>
  <a href="https://github.com/phoenixbeats01/snkrhub/issues/">
    <img src="https://img.shields.io/github/issues/phoenixbeats01/snkrhub?style=flat-square" alt="open issues" />
  </a>
  <a href="https://github.com/phoenixbeats01/snkrhub/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/licence-MIT-brightgreen?style=flat-square" alt="license" />
  </a>
</p>
   
<!-- <h4>
    <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Request Feature</a>
  </h4> -->
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Frontend Locally](#run-frontend-locally)
  - [Run Backend Locally](#run-backend-locally)
- [License](#license)

<!-- About the Project -->

## About the Project

<div align="center"> 
    <img src="https://i.ibb.co/hB6Jzfv/snkrhubscreenshot.png" alt="snkrhubscreenshot">
</div>

This project was created to learn about Microservices and Kubernetes.

The front end of the project is created with React Native. I chose React Native because I primarily build projects in Next.js so I just wanted to switch it up. There is not much to talk about on the front end as the focus of this project was to learn about Microservices & Kubernetes.

The backend consisted of 3 services, the inventory service, the analytics service and the gateway service. The apis were built with [Apollo Federation](https://www.apollographql.com/docs/federation/#:~:text=Apollo%20Federation%20is%20a%20powerful,Users). I chose this architecture as it allows individual GraphQL apis to be composed into subgraphs which can then be queried from the gateway which acts as a single access point. Having a single access point makes the server [more secure, reduces round trips and reduces the complexity of having each service handle concerns such as authorization and SSL.](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/direct-client-to-microservice-communication-versus-the-api-gateway-pattern#why-consider-api-gateways-instead-of-direct-client-to-microservice-communication)

To be able to deploy the project, I had to learn the basics of Kubernetes. This was the hardest part of the whole project and it took a while to understand what was going on. Once I kinda knew what I was doing, deploying the backend was pretty straight forward. All configurations were defined in yaml files and separated into folders to make it easier to manage of all the configuration. First the databases were deployed, they use Persistent Volumes to keep the data intact even if the pod restarts. After that, the gateway was deployed. It defines an Ingress resource to expose the gateway to the client, the gateway is exposed on the host `skrhub.xyz`. Then, the configuration which issued a tls certificate for `snkrhub.xyz` was deployed. Once the gateway was working, the last step was to deploy the subgraphs.

The only major difficulty I had with the deployment was getting tls configured, I followed this guide [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-6-issuing-staging-and-production-let-s-encrypt-certificates).

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactnative.dev/">React Native</a></li>
    <li><a href="https://nativebase.io/">Nativebase</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://sequelize.org//">Sequelize</a></li>    
    <li><a href="https://www.apollographql.com/">Apollo</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://docs.github.com/en/actions/">Github Actions</a></li>
    <li><a href="https://kubernetes.io/">Kubernetes</a></li>
  </ul>
</details>

<!-- Prerequisites -->

### Prerequisites

Before running this project, make sure you have docker installed.
You will also need either XCode or Android studio installed and configured with an emulator (to run the frontend)

<!-- Run Frontend Locally -->

### Run Frontend Locally

Clone the project

```bash
  git clone https://github.com/phoenixbeats01/snkrhub.git
```

Go to the snkrhub directory

```bash
  cd snkrhub/snkrhub
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

IMPORTANT:

When you are viewing this, the domain `snkrhub.xyz` may have been taken offline. If so, you will need to configure the app to use the backend gateway locally that we will set up in the next step.

Inside the snkrhub folder, open up the `apollo` folder.

Open up `client.ts`.

Replace the client uri with `http://localhost:3000/graphql`

<!-- Run Backend Locally -->

### Run Backend Locally

Go to the backend directory

```bash
  cd snkrhub/backend
```

Run the docker compose command to start up all the services.

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

<!-- License -->

## License

Distributed under the MIT License. See LICENSE.txt for more information.
