# Zappy Ride API Implementation

Hello, this is the implementation of the API requested by Zappy Ride.

It exposes a single endpoint that can be accessed with different HTTP methods to perform different functions

- **GET /events** - Retrieves the JSON list of all events that currently exist in the database

- **POST /events** - Adds a new event in the database

- **PUT /events** - Updates an existing event in the database
 
- **DELETE /events** - Deletes an existing event from the database

## Technology Stack

The following technology stack was used to build this simplistic endpoint

- [Serverless](https://www.serverless.com/) - The Serverless framework is used to enable local development of the API and for provisioning the needed resources required in AWS (i.e. AWS Lambda and API Gateway)

- [node-pg](https://node-postgres.com/) - The node-pg library is used for interacting with the PostgreSQL database

- PostgreSQL - PostgreSQL was the database of choice for persisting the events

- Node - This API was developed in Node (TypeScript) 


## Installation for Local Development

1. Run `cp .env.template .env` to create your own custom `.env` file

2. Run `npm install` to install all of the needed dependencies for local development

3. Run `npm run dev` to start the offline API server. It will reload in real-time as you make changes to your TypeScript files and save them


## Deploying to AWS

1. Run `npm run deploy` to start the deployment process