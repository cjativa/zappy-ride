import { APIGatewayEvent, Context, Callback } from "aws-lambda";

const EventController = {

    /** Returns a JSON list of all events in the database */
    readEvents: (event: APIGatewayEvent, context: Context, callback: Callback) => {
        console.log(`Read events`);
    },

    /** Adds a new event in the database */
    createEvent: (event: APIGatewayEvent, context: Context, callback: Callback) => {

    },

    /** Updates an event in the database */
    updateEvent: (event: APIGatewayEvent, context: Context, callback: Callback) => {

    },

    /** Deletes an event in the database */
    deleteEvent: (event: APIGatewayEvent, context: Context, callback: Callback) => {

    },
};

export default EventController;