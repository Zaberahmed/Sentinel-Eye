import { Request, Response } from 'express';
import { createPost, findAllPost, findPostById } from './../models/post.model';
const makePost = async (req: Request, res: Response) => {
	try {
		const { user_id, text } = req.body;
		const post = { user_id, text };
		const newPost = await createPost(post);
		return res.status(201).send(newPost);
	} catch (error) {
		console.log(error);
	}
};

export { makePost };
