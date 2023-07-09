import { Post } from './../interfaces/post.interface';
const mongoose = require('mongoose');

const postSchema: Post = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	timestamp: {
		type: String,
		require: true,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			require: false,
		},
	],
});

const Post = mongoose.model('Post', postSchema);

export const createPost = async (post: Post) => {
	try {
		const time = new Date().getTime().toString();
		return await Post.create({
			user_id: post.user_id,
			timestamp: time,
		});
	} catch (error) {
		console.log(error);
	}
};

export const findAllPost = async () => {
	try {
		return await Post.find({});
	} catch (error) {
		console.log(error);
	}
};

export const findPostById = async (id: string) => {
	try {
		return await Post.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};
