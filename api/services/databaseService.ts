import { Pool } from 'pg';
import Config from '../config';

// Create the pool of connections that we can use
const pool = new Pool({
    host: Config.databaseHost,
    database: Config.databaseName,
    user: Config.databaseUser,
    password: Config.databasePassword,
    port: Config.databasePort
});

export default class Database {

    private static pool: Pool = pool;

    /** Performs the provided query on the database, with the provided values array, if provided */
    public static query = async (query: string, values?: any[]) => {

        // Get a client from the pool to run this query
        const client = await Database.pool.connect();

        try {

            let response;

            // Get the response from the query
            if (values) response = await client.query(query, values);
            else response = await client.query(query);

            // Return only the rows, node-pg returns a lot of unneeded info
            return response?.rows;
        }

        catch (error) {
            console.log(`An error occurred running the query ${query}`, error);
        }

        finally {

            // Release the client anyway
            client.release();
        }
    };
}