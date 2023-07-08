import { Comment } from 'interfaces/comment.interface';
const mongoose = require('mongoose');

const commentSchema: Comment = new mongoose.Schema({
	user_id: {
		type: String,
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
