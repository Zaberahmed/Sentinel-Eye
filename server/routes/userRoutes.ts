const userRouter = require('express').Router();
const userController = require('./../controllers/user.controller');
const authenticator = require('./../middleware/authenticator');
import { Request, Response } from 'express';

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authenticator, userController.profile);

module.exports = userRouter;
