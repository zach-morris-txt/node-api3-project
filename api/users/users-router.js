const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Posts = require('../posts/posts-model.js')
const Users = require('./users-model.js')

const { 
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
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
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

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'User Deleted'})
    })
    .catch(next)
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  const postInfo = {...req.body, user_id: req.params.id}

  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      next(error)
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;