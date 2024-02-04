import mongoose from 'mongoose';
// https://mongoosejs.com/docs/guide.html
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const Schema = mongoose.Schema; 
// the UserSchema
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders"
  }],
  wishLists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "WishLists"
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  hasShippingAddress: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    addressLine: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    }
  }
}, 
{
  timestamps: true
})
// The {timestamps: true} option creates a createdAt and updatedAt field on our models 
// that contain timestamps which will get automatically updated when our model changes.

// User` is a "Model", a subclass of `mongoose.Model
const User = mongoose.model("User", UserSchema);
// then you can use a Model to create new documents. e.g.
// const user1 = new User({fullName: "Sherlock Holms"});

export default User;