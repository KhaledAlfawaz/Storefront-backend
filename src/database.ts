import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let client;

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, ENV, DB_TEST_NAME } =
  process.env;

if (ENV === 'test') {
  client = new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}

if (ENV === 'dev') {
  client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}

export default client as Pool;
