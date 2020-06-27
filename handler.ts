import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ApiRouter from './api/index';

// modern module syntax
export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    // Hand-off the event to our custom api router
    ApiRouter(event, context, callback);
}