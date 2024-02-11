import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

// function: user registration
// endpoint: POST /api/v1/users/register
// access: private; only the developer can register an Admin user
export const registerUser = expressAsyncHandler(async(req, res) => {
  // extract fullname, email, password attributes from request body
  const {fullName, email, password} = req.body;
  // check if the user already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    // throw an error
    throw new Error("Registration failed: user email already exist.");
  }
  // otherwise, create a new user, and send a response
  // first, hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)
  // create user with hashed password
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword
  });
  // send a response 
  res.status(201).json({
    status: "success",
    message: "User registered sucessfully",
    data: user
  });
  //201 indicates that a request has been successfully fulfilled, and as a result, a new resource has been created. This status code is often used for successful POST requests, where the server creates a new resource based on the information provided in the request. 
});

// function: user login
// endpoint: POST /api/v1/users/login
// access: public
export const loginUser = expressAsyncHandler(async(req, res) => {
  const {email, password} = req.body;
  // check if user exists
  const user = await User.findOne({email});

  if (user && await bcrypt.compare(password, user?.password)) {
    res.status(200).json({
      status: "sucess",
      message: "Login succeeded",
      data: user,
      token: generateToken(user?._id)
    });
  } else if (!user) {
    throw new Error("Login failed: user does not exist.");
  } else {
    throw new Error("Login failed: invalid credentials.");
  }
});

// function: user login
// endpoint: GET /api/v1/users/profile
// access: private
export const getUserProfile = expressAsyncHandler((async(req, res)=>{
  // extract the token from request header
  const token = getTokenFromHeader(req);
  //send token to JWT server to verify the token
  const decodedUser = verifyToken(token);
  console.log(decodedUser);
  console.log(req);``
  res.json({
    message: "get profile succeeded"
  })
}));



