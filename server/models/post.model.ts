import { Post } from 'interfaces/post.interface';
const mongoose = require('mongoose');

const postSchema: Post = new mongoose.Schema({
	user_id: {
		type: String,
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
		},
	],
});

const Post = mongoose.model('Post', postSchema);
