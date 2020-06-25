import dotenv from 'dotenv';

const Config = {

    databaseHost: process.env.DATABASE_HOST!,
    databaseUser: process.env.DATABASE_USER!,
    databasePassword: process.env.DATABASE_PASSWORD!,
    databasePort: parseInt(process.env.DATABASE_PORT!),    
};

export default Config;