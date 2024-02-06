import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';

// database connect
dotenv.config(); // dotenv.config() enables access to .env file
dbConnect();

// create an app
const app = express();
app.use(express.json());

// add routes to app as middlewares (a middleware can access req and res, and do some operations on them)
app.use("/", userRoutes);

// export app as a module for other files to use
export default app;
