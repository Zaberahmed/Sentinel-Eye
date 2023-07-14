import { Request, Response } from 'express';
import { createComment, findAllComment, findCommentById } from './../models/comment.model';

import { findPostById } from './../models/post.model';
const makeComment = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (token) {
			const { post_id, text, timestamp, user_id, user_name } = req.body;
			const comment = { post_id, text, timestamp, user_id, user_name };
			const newComment = await createComment(comment);
			const { _id } = newComment;

			const post = await findPostById(post_id);
			post.comments.push(_id);
			await post.save();

			return res.status(201).send(newComment);
		}
	} catch (error) {
		console.log(error);
	}
};
const getAllComment = async (req: Request, res: Response) => {
	try {
		const comments = await findAllComment();
		return res.status(200).send(comments);
	} catch (error) {
		console.log(error);
	}
};
const getCommentById = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const comment = await findCommentById(_id);
		return res.status(200).send(comment);
	} catch (error) {
		console.log(error);
	}
};

export { makeComment, getAllComment, getCommentById };
