import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ApiRouter from './api/index';

// modern module syntax
export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    console.log(`You hit /events`);

    ApiRouter(event, context, callback);
}