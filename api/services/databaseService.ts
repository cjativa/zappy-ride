import { Pool } from 'pg';
import Config from '../config';

const pool = new Pool({
    host: Config.databaseHost,
    user: Config.databaseUser,
    password: Config.databasePassword,
    port: Config.databasePort
});

export class Database {

    pool: Pool = pool;

    public static query = (query: string, values?: any[]) => {

    }
}