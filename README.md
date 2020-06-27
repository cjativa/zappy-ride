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

Serverless requires credentials to be able to deploy to AWS. Typically, you provision a set of programmatic user and then generate credentials for that user (AWS Access Key ID/Secret Access Key pair) to assign to Serverless. You should only the permissions to this user that are needed by the API to performs its needed functions.

For this demonstration, I went to top-right of the AWS Console Menu > My Security Credentials > and generated an Access Key ID/Secret Access Key pair based off my user account. In Production, I would create a new programmatic user with restricted access to AWS services and generate the credentials for that restricted user so as to sandbox them to only the services they need access to (in this case, RDS, Lambda, API Gateway).


1. Run 

    ```
    EXPORT ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
    EXPORT SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
    ```

    to set the credentials for Serverless to use to do the deployment.

2. Provision and create your PostgreSQL database in AWS RDS. This repository does not perform that for you. Ensure you make note of the database host, name, user, and password. You will also have to ensure you set "Public Accessibility" to your database to ON

3. Run `npm run deploy` to start the deployment process of your code to API Gateway/Lambda

4. Update the environment variables in your newly deployed Lambda function accordingly with the needed variables as specified by `.env.template`

5. (Optional) You can connect to your remote database and restore the database dump included in this repository to your RDS database.

## Live Environment

• URL of the publicly accessible endpoint - https://sox3vnk5wc.execute-api.us-east-1.amazonaws.com/prod/events

• Postman collection that accesses the endpoint across methods - [Postman Collection](https://github.com/cjativa/zappy-ride/blob/master/zappyride.postman_collection.json)

• Description of your setup and pointers for us to review your work in AWS 

My API is deployed on AWS. I described the architecture above but you can find the relative information here
 - RDS https://console.aws.amazon.com/rds/home?region=us-east-1#database:id=zappy-ride-test;is-cluster=false
 - Lambda https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/zappy-ride-prod-events?tab=configuration
 - API Gateway https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/sox3vnk5wc/resources/reqqpnraqe

    Please ping me if the database credentials are needed. The high-level architecture is that a handler is exposed by the Lambda and then the [Index File](https://github.com/cjativa/zappy-ride/blob/master/api/index.ts) routes the request to the appropriate endpoint controller (i.e. for GET/POST/PUT/DELETE). It functions similarly to an Express Router.

    The controllers then return the appropriate response, based on whether or not the provided input was valid, so there is basic input validation on the payload provided by the consumer.

• API source code (you may use GitHub for source control) - This repository
