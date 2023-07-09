import { Comment } from './../interfaces/comment.interface';
const mongoose = require('mongoose');

const commentSchema: Comment = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	timestamp: {
		type: String,
		require: true,
	},
	text: {
		type: [String],
		require: true,
	},
});

const Comment = mongoose.model('Comment', commentSchema);

export const createComment = async (comment: Comment) => {
	try {
		const time = new Date().getTime().toString();

		return await Comment.create({
			timestamp: time,
			text: comment.text,
			user_id: comment.user_id,
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
