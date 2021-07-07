const User = require('../user/user-model.js')
const Post = require('../post/post-model.js')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] ${req.path} ${req.timestamp}`)
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: 'user not found'
        })
      } else {
        req.user = user
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name) {
    // validation fails
    next({
      status: 400,
      message: 'missing required name field',
    })
  } else {
    req.user = { name: req.body.name.trim() }
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text) {
    // validation fails
    next({
      status: 400,
      message: 'missing required text field',
    })
  } else {
    req.user = { name: req.body.name.trim() }
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}