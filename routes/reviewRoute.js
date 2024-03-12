import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const reviewRoutes = express.Router();

reviewRoutes.post('/create', isLoggedIn, createReview);

export default reviewRoutes;