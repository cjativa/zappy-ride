import { Pool } from 'pg';
import Config from '../config';

const pool = new Pool({
    host: Config.databaseHost,
    database: Config.databaseName,
    user: Config.databaseUser,
    password: Config.databasePassword,
    port: Config.databasePort
});

export default class Database {

    private static pool: Pool = pool;

    public static query = async (query: string, values?: any[]) => {

        // Get a client from the pool to run this query
        const client = await Database.pool.connect();

        try {

            let response;

            // Get the response from the query
            if (values) response = await client.query(query, values);
            else response = await client.query(query);

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