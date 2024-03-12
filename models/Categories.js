import mongoose from 'mongoose';
// https://mongoosejs.com/docs/guide.html
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const Schema = mongoose.Schema; 
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "https://picsum.photos/200/300",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
   }
],
}, 
{
  timestamps: true,
})
// The {timestamps: true} option creates a createdAt and updatedAt field on our models 
// that contain timestamps which will get automatically updated when our model changes.

// mongoose.model() is used to create or retrieve a Mongoose model
// "Product" is the name of the model, ProductSchema is the associated schema
const Category = mongoose.model("Category", CategorySchema);
// then you can use a Model to create new documents. e.g. const product1 = new Product();

export default Category;