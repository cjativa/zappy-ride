import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import EventController from './controllers/eventController';

/** Acts as a router for the event http methods -- directing each request to the appropriate controller function 
 * Normally, this would be an Express Router rather than this custom switcher
*/
const ApiRouter = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    switch (event.httpMethod) {

        case 'GET':
            return EventController.readEvents(event);

        case 'POST':
            return EventController.createEvent(event);

        case 'PUT':
            return EventController.updateEvent(event);

        case 'DELETE':
            return EventController.deleteEvent(event);


        default:
            return EventController.readEvents(event);
            // return callback(null, { statusCode: 503, message: "Unsupported method" });
    }

};

export default ApiRouter;