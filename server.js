//This file is the server file to run the application

// nodeJS http module: https://www.w3schools.com/nodejs/nodejs_http.asp
import http from 'http';
import app from './app/app.js'

//the port on which the server should listen
// if the environment variable PORT is set (usually during deployment/production), use that one; otherwise, use the default 7000
const PORT = process.env.PORT || 7000;

const server = http.createServer(app);
// listen to the client at a port
server.listen(PORT, console.log(`Server is running on port ${PORT}`));



