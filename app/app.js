import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnect.js';

// dotenv.config() enables access to .env file
dotenv.config();
dbConnect();
const app = express();

// export app as a module for other files to use
export default app;
