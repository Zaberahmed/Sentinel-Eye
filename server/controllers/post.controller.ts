import { Request, Response } from 'express';
import { createPost, findAllPost, findPostById } from './../models/post.model';
const makePost = async (req: Request, res: Response) => {
	try {
		const { type, user_id, text } = req.body;
		const post = { type, user_id, text };
		const newPost = await createPost(post);
		return res.status(201).send(newPost);
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

export { makePost, getAllPost, getPostById, getPostByType };
