//The data structure for products

import mongoose from 'mongoose';
// https://mongoosejs.com/docs/guide.html
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const Schema = mongoose.Schema; 
// the ProductSchema
// note: user attribute means the creator of the product (admin user)
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    ref: "Category",
    required: true,
  },
  sizes: {
    type: [String],
    enum: ["S","M","L","XL","XXL"],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  images: [{
    type: String,
    default: "http://via.placeholder.com/150",
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],
  price: {
    type: Number,
    required: true,
  },
  totalQty: {
    type: Number,
    required: true,
  },
  totalSold: {
    type: Number,
    required: true,
    default: 0,
  },
}, 
{
  timestamps: true,
  toJSON: {virtuals: true},
})
// The {timestamps: true} option creates a createdAt and updatedAt field on our models 
// that contain timestamps which will get automatically updated when our model changes.

// mongoose.model() is used to create or retrieve a Mongoose model
// "Product" is the name of the model, ProductSchema is the associated schema
const Product = mongoose.model("Product", ProductSchema);
// then you can use a Model to create new documents. e.g. const product1 = new Product();

export default Product;