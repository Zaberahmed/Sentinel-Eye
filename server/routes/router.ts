const router = require('express').Router();
const userController = require('./../controllers/user.controller');
const postController = require('./../controllers/post.controller');
const commentController = require('./../controllers/comment.controller');
const crimeController = require('./../controllers/crime.controller');
const authenticator = require('./../middleware/authenticator');
import axios from 'axios';
import { Request, Response } from 'express';

//user routes
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/profile', authenticator, userController.profile);
router.get('/users', authenticator, userController.getAllUser);
router.get('/user', authenticator, userController.getUser);
router.delete('/logout', authenticator, userController.logout);

//post routes

router.post('/create-post', authenticator, postController.makePost);
router.get('/all-post', authenticator, postController.getAllPost);
router.get('/find-post-by-id', authenticator, postController.getPostById);
router.get('/find-post-by-type', authenticator, postController.getPostByType);

//comment routes

router.post('/create-comment', authenticator, commentController.makeComment);
router.get('/all-comment', authenticator, commentController.getAllComment);
router.get('/find-comment', authenticator, commentController.getComment);

//Crime report routes
router.post('/create-crime-report', authenticator, crimeController.makeCrimeReport);
router.get('/all-crime', authenticator, crimeController.getAllCrime);
router.get('/find-crime-by-id', authenticator, crimeController.getCrimeById);
router.get('/find-crime-by-month', authenticator, crimeController.getCrimeByMonth);
router.get('/find-crime-by-location', authenticator, crimeController.getCrimesByLocation);
//missing report routes

//UK police data
router.get('/uk-crime', async (req: Request, res: Response) => {
	try {
		const { lat, lng, date } = req.query;
		const data = await axios.get('https://data.police.uk/api/crimes-street/all-crime?' + 'lat=' + lat + '&lng=' + lng + '&date=' + date);

		res.send(data.data);
	} catch (error) {
		console.log(error);
	}
});
export { router };
