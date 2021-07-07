const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Post = require('../posts/posts-model.js')
const express = require('express')

const Users = require('./users-model.js')
const { 
  logger, 
  validateUserId, 
  validateUser, 
  validatePost, 
} = require('../middleware/middleware')

const router = express.Router();



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      next(error)
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: ''})
    })
    .catch(next)
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
