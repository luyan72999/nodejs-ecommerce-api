import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoute.js';
import productRoutes from '../routes/productRoute.js';
import categoryRoutes from '../routes/categoryRoute.js';
import reviewRoutes from '../routes/reviewRoute.js';
import { globalErrorHandler, urlNotFoundHandler } from '../middlewares/globalErrorHandler.js';


// database connect
dotenv.config(); // dotenv.config() enables access to .env file
dbConnect();

// create an app
const app = express();

// add express.json() to app as middleware
app.use(express.json());

// add routes to app as middlewares (a middleware can access req and res, and do some operations on them)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// the error handler middlewares pipeline
app.use(urlNotFoundHandler);
app.use(globalErrorHandler);


// export app as a module for other files to use
export default app;
