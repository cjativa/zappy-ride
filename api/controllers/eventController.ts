import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import EventService from "../services/eventService";

/** Controllers for handling API endpoint calls */
export default class EventController {

    private static handleResponse = (callback: Callback, body: any) => {

        const response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };

        callback(null, response);
    };

    /** Returns a JSON list of all events in the database */
    public static readEvents = async (event: APIGatewayEvent, context: Context, callback: Callback) => {

        const events = await EventService.getEvents();
        EventController.handleResponse(callback, events);
    };

    /** Adds a new event in the database */
    public static createEvent = async (event: APIGatewayEvent, context: Context, callback: Callback) => {

        // Get the needed fields for creating an event and validate them
        const { organizer, venue, date } = JSON.parse(event.body!);
        const inputValid = EventController.validateInput({ organizer, venue, date }, event.httpMethod, callback);

        if (!inputValid) return;

        // Create the event and return the result
        const result = await EventService.createEvent(organizer, venue, date);
        EventController.handleResponse(callback, result);
    };

    /** Updates an event in the database */
    public static updateEvent = async (event: APIGatewayEvent, context: Context, callback: Callback) => {

        const { organizer, venue, date, id } = JSON.parse(event.body!);
        const inputValid = EventController.validateInput({ id }, event.httpMethod, callback);

        if (!inputValid) return;

        // Update the event and return the results
        const result = await EventService.updateEvent(id, organizer, venue, date);
        EventController.handleResponse(callback, result);
    };

    /** Deletes an event in the database */
    public static deleteEvent = async (event: APIGatewayEvent, context: Context, callback: Callback) => {

        const { id } = JSON.parse(event.body!);
        const inputValid = EventController.validateInput({ id }, event.httpMethod, callback);

        if (!inputValid) return;

        // Update the event and return the results
        const result = await EventService.deleteEvent(id);
        EventController.handleResponse(callback, result);
    };

    /** Handles basic input validation provided by the endpoint consumers. Handles responding to the consumers if input is invalid */
    private static validateInput = (args, method: APIGatewayEvent['httpMethod'], callback: Callback): boolean => {

        // Track invalid inputs
        const invalidInputs = [];
        let inputValid = true;

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

            const response = {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Invalid request to API resource for ${actionText}. Your request did not provide the following fields: [${invalidInputs.toString()}].`
                })
            };

            callback(null, response);
        }

        return inputValid;
    };
};
