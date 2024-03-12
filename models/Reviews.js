import mongoose from 'mongoose';

const Schema = mongoose.Schema; 
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A review must belong to a single user."],
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A review must belong to a single product."],
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min:1,
    max:5,
  }
}, 
{
  timestamps: true,
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;