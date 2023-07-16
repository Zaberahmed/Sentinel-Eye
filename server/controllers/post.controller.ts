import { Request, Response } from 'express';
import { createPost, findAllPost, findPostById, updateIsVerified } from './../models/post.model';
import { findUserById } from './../models/user.model';
import { getSession } from './../middleware/sessionManagement';
const makePost = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (token) {
			const session = getSession(token);
			const { type, user_id, user_name, text, timestamp, isVerified } = req.body;
			const post = { type, user_id, user_name, text, timestamp, isVerified };
			const newPost = await createPost(post);
			const { _id } = newPost;
			const user = await findUserById(session.userId);
			user.posts.push(_id);
			await user.save();
			return res.status(201).send(newPost);
		}
	} catch (error) {
		console.log(error);
	}
};
const getAllPost = async (req: Request, res: Response) => {
	try {
		const posts = await findAllPost();
		return res.status(200).send(posts);
	} catch (error) {
		console.log(error);
	}
};
const getPostById = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const post = await findPostById(_id);
		return res.status(200).send(post);
	} catch (error) {
		console.log(error);
	}
};
const getPostByType = async (req: Request, res: Response) => {
	try {
		const { type } = req.body;
		const post = await findPostById(type);
		return res.status(200).send(post);
	} catch (error) {
		console.log(error);
	}
};
const updatePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const post = await updateIsVerified(_id);
		return res.status(200).send(post);
	} catch (error) {
		console.log(error);
	}
};

export { makePost, getAllPost, getPostById, getPostByType, updatePost };
