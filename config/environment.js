import dotenv from 'dotenv';

dotenv.config();

export const credentials = {
    username: process.env.ADACTIN_USERNAME,
    password: process.env.ADACTIN_PASSWORD
};
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';