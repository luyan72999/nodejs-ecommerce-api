import expressAsyncHandler from "express-async-handler";
import Review from "../models/Reviews.js";

// function create a review
// endpoint: reviews/create
// access: private (logged in user)
export const createReview = expressAsyncHandler(async(req,res)=>{
  const {userId, productId, message, rating} = req.body;

  res.json("review controller.")
});