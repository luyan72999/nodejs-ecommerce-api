// The controller to register a user
// endpoint: POST /api/v1/users/register
// access: only the developer (private) can register an Admin user
import User from '../models/Users.js';

async function registerUser(req, res) {
  // extract fullname, email, password attributes from request body
  const {fullName, email, password} = req.body;
  // check if the user already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    // throw an error

    // send a response
    res.json({
      errorMessage: "User already exists"
    });
  }
  // otherwise, create a new user, and send a response
  const user = await User.create({
    fullName,
    email,
    password
  });

  res.status(201).json({
    status: "sucess",
    message: "User registered sucessfully",
    data: user
  });
  //201 indicates that a request has been successfully fulfilled, and as a result, a new resource has been created. This status code is often used for successful POST requests, where the server creates a new resource based on the information provided in the request.
  
}

export default registerUser;