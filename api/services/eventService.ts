import Database from './databaseService';

/** Class responsible for performs the CRUD updates to the "events" table */
export default class EventService {

    /** Performs actions in the database for creating an event */
    public static createEvent = async (organizer: string, venue: string, date: string) => {

        const query = `
        INSERT into events (organizer, venue, date)
        VALUES ('${organizer}', '${venue}', '${date}')
        RETURNING 
            id,
            organizer,
            venue,
            date
        `;

        const results = await Database.query(query);
        return results;
    };

    /** Performs actions in the database for updating an event */
    public static updateEvent = async (id: number, organizer: string, venue: string, date: string) => {

        const query = `
        UPDATE events
        SET
            organizer = '${organizer}',
            venue = '${venue}',
            date = '${date}'
        WHERE id = ${id}
        RETURNING 
            id,
            organizer,
            venue,
            date
        `;

        const results = await Database.query(query);
        return results;
    };

    /** Performs actions in the database for deleting an event */
    public static deleteEvent = async (id: number) => {

        const query = `
        DELETE FROM events
        WHERE id = ${id}
        `;

        const result = await Database.query(query);
        return result;
    };

    /** Retrieves the events that exist in the database */
    public static getEvents = async () => {

        const query = `
        SELECT * 
        FROM events
        `;

        const results = await Database.query(query);
        return results;
    };
}