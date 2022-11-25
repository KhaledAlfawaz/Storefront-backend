"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client;
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, ENV, DB_TEST_NAME } = process.env;
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_TEST_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
exports.default = client;
