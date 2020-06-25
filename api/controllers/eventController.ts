import { APIGatewayEvent, Context, Callback } from "aws-lambda";

/** Controllers for handling API endpoint calls */
export default class EventController {

    /** Returns a JSON list of all events in the database */
    public static readEvents = (event: APIGatewayEvent, context: Context, callback: Callback) => {


    };

    /** Adds a new event in the database */
    public static createEvent = (event: APIGatewayEvent, context: Context, callback: Callback) => {

        const { organizer, venue, date } = JSON.parse(event.body!);
        EventController.validateInput({ organizer, venue, date }, event.httpMethod, callback);


    };

    /** Updates an event in the database */
    public static updateEvent = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    };

    /** Deletes an event in the database */
    public static deleteEvent = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    };

    /** Handles validating input provided by the endpoint consumers */
    private static validateInput = (args, method: APIGatewayEvent['httpMethod'], callback: Callback) => {

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
    };
};
