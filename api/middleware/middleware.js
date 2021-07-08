const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date()
  console.log(`
    [${req.method}] 
    ${req.originalUrl} 
    ${date.toLocaleString()}`)
  next()
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