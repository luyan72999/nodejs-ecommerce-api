// use specific route for a specific controller and model
// express router
// the router for user registration
import express from 'express';
import {registerUser, loginUser} from '../controllers/usersController.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register',registerUser);
userRoutes.post('/api/v1/users/login',loginUser);

export default userRoutes;