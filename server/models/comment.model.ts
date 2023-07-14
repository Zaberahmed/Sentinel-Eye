import { Comment } from './../interfaces/comment.interface';
const mongoose = require('mongoose');

const commentSchema: Comment = new mongoose.Schema({
	post_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	timestamp: {
		type: String,
		require: true,
	},
	text: {
		type: String,
		require: true,
	},
	user_id: {
		type: String,
		require: true,
	},
	user_name: {
		type: String,
		require: true,
	},
});

const Comment = mongoose.model('Comment', commentSchema);

export const createComment = async (comment: Comment) => {
	try {
		return await Comment.create({
			timestamp: comment.timestamp,
			text: comment.text,
			post_id: comment.post_id,
			user_id: comment.user_id,
			user_name: comment.user_name,
		});
	} catch (error) {
		console.log(error);
	}
};

export const findAllComment = async () => {
	try {
		return await Comment.find({});
	} catch (error) {
		console.log(error);
	}
};
export const findCommentById = async (id: string) => {
	try {
		return await Comment.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};
