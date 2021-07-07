const express = require('express');

const usersRouter = require('./users/users-router.js')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use(logger (req, res, next) => {
  next()
})
server.use('./api/users', usersRouter) //Cnnecting Middleware Directly To RouterEndpoints Instead



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
