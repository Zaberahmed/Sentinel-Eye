import { Post } from './../interfaces/post.interface';
const mongoose = require('mongoose');

const postSchema: Post = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	text: {
		type: [String],
		require: true,
	},
	timestamp: {
		type: String,
		require: false,
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

const createPost = async (post: Post) => {
	try {
		const time = new Date().getTime().toString();
		return await Post.create({
			text: post.text,
			user_id: post.user_id,
			timestamp: time,
		});
	} catch (error) {
		console.log(error);
	}
};

const findAllPost = async () => {
	try {
		return await Post.find({});
	} catch (error) {
		console.log(error);
	}
};

const findPostById = async (id: string) => {
	try {
		return await Post.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};

export { createPost, findAllPost, findPostById };
