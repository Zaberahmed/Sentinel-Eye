const userRouter = require('express').Router();
const userController = require('./../controllers/user.controller');
const authenticator = require('./../middleware/authenticator');

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);

module.exports = userRouter;
