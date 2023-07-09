import { Request, Response } from 'express';
import { createComment, findAllComment, findCommentById } from './../models/comment.model';
const makeComment = async (req: Request, res: Response) => {
	try {
		const { user_id, text } = req.body;
		const comment = { user_id, text };
		const newComment = await createComment(comment);
		return res.status(201).send(newComment);
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
const getComment = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const comment = await findCommentById(_id);
		return res.status(200).send(comment);
	} catch (error) {
		console.log(error);
	}
};

export { makeComment, getAllComment, getComment };
