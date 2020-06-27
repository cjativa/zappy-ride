import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import EventService from "../services/eventService";

/** Controller methods for responding to API endpoint calls */
export default class EventController {

    /** Handles executing the callback to return the response to the API consumer */
    private static handleResponse = (body: any) => {

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };

        return response;
    };

    /** Returns a JSON list of all events in the database */
    public static readEvents = async (event: APIGatewayEvent) => {

        const s = Date.now()

        const events = await EventService.getEvents();

        const e = Date.now();

        console.log(`Time for call ${(e - s) / 1000} seconds`);
        return EventController.handleResponse(events);
    };

    /** Adds a new event in the database */
    public static createEvent = async (event: APIGatewayEvent) => {

        // Get the needed fields for creating an event and validate them
        const { organizer, venue, date } = JSON.parse(event.body!);
        const validation = EventController.validateInput({ organizer, venue, date }, event.httpMethod);

        if (!validation.inputValid) return validation.response;

        // Create the event and return the result
        const result = await EventService.createEvent(organizer, venue, date);
        return EventController.handleResponse(result);
    };

    /** Updates an event in the database */
    public static updateEvent = async (event: APIGatewayEvent) => {

        const { organizer, venue, date, id } = JSON.parse(event.body!);
        const validation = EventController.validateInput({ id }, event.httpMethod);

        if (!validation.inputValid) return validation.response;

        // Update the event and return the results
        const result = await EventService.updateEvent(id, organizer, venue, date);
        return EventController.handleResponse(result);
    };

    /** Deletes an event in the database */
    public static deleteEvent = async (event: APIGatewayEvent) => {

        const { id } = JSON.parse(event.body!);
        const validation = EventController.validateInput({ id }, event.httpMethod);

        if (!validation.inputValid) return validation.response;

        // Update the event and return the results
        const result = await EventService.deleteEvent(id);
        return EventController.handleResponse(result);
    };

    /** Handles basic input validation provided by the endpoint consumers. Handles responding to the consumers if input is invalid */
    private static validateInput = (args, method: APIGatewayEvent['httpMethod']) => {

        // Track invalid inputs
        const invalidInputs = [];
        let inputValid = true;
        let response;

        for (let [key, value] of Object.entries(args)) {

            // Check if the requested value was provided
            if (value == undefined) {
                invalidInputs.push(key);
                inputValid = false;
            }
        }

        // If our input validity did not pass
        if (inputValid == false) {

            let actionText;
            switch (method.toLowerCase()) {
                case 'post':
                    actionText = 'creating an event'
                    break;

                case 'get':
                    actionText = 'reading an event'
                    break;

                case 'put':
                    actionText = 'updating an event'
                    break;

                case 'delete':
                    actionText = 'deleting an event'
                    break;
            }

            response = {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Invalid request to API resource for ${actionText}. Your request did not provide the following fields: [${invalidInputs.toString()}].`
                })
            };

        }

        return { inputValid, response };
    };
};
