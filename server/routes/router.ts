const router = require('express').Router();
const userController = require('./../controllers/user.controller');
const postController = require('./../controllers/post.controller');
const authenticator = require('./../middleware/authenticator');
import { Request, Response } from 'express';

//user routers
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/profile', authenticator, userController.profile);
router.get('/users', authenticator, userController.getAllUser);
router.get('/user', authenticator, userController.getUser);
router.delete('/logout', authenticator, userController.logout);

//post routes

router.post('/post', authenticator, postController.makePost);

export { router };
