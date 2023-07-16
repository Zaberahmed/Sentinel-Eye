import { useEffect, useState } from 'react';

import { Post } from '../../interfaces/post.interface';
import { Profile, createComment, getCommentById } from '../../services/user.service';
import { RegisteredUser } from '../../interfaces/user.interface';
import { Comment } from '../../interfaces/comment.interface';
import './commentPanel.component.css';
import formatTime from '../../utils/formatTime';
import pp from './../../assets/PP.jpg';

interface CommentPanelProps {
	post: Post;
}

const CommentPanel = (props: CommentPanelProps) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState('');
	const [user, setuser] = useState<RegisteredUser>();

	const addComment = async () => {
		if (user?._id && props.post._id) {
			const post_id = props.post._id;
			const text = newComment;
			const timestamp = new Date().getTime().toString();
			const user_id = user._id;
			const user_name = user.name;

			const comment = { post_id, text, timestamp, user_id, user_name };
			const result = await createComment(comment);
			// console.log(result);
			setComments((prevState: Comment[]) => [...prevState, result]);
			setNewComment('');
		}
	};

	useEffect(() => {
		const fetchComments = async () => {
			if (props.post.comments?.length) {
				const fetchedComments = await Promise.all(
					props.post.comments.map(async (id) => {
						const result = await getCommentById({ _id: id });
						return result;
					})
				);
				setComments(fetchedComments);
			}
		};

		fetchComments();
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await Profile();
				// console.log(result);
				setuser(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, []);
	const validateForm = () => {
		return !newComment;
	};
	return (
		<div className="comment-panel">
			<h3>Comments</h3>
			{props.post.comments?.length === 0 ? (
				<p>No comments yet.</p>
			) : (
				<div className="comment-list">
					{comments?.map((comment) => (
						<div
							className="comment-item"
							key={comment.timestamp}>
							<div className="comment-header">
								<img
									src={pp}
									className="comment-profile-picture"
									alt="Profile Picture"
								/>
								<div className="comment-profile-info">
									<h3 className="comment-profile-name">{comment.user_name}</h3>
									<p className="comment-time">{formatTime(parseInt(comment.timestamp))}</p>
								</div>
							</div>
							<div className="comment-text">{comment.text}</div>
						</div>
					))}
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment();
				}}
				className="comment-form">
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Add a comment"
				/>
				<button
					type="submit"
					disabled={validateForm()}>
					Add
				</button>
			</form>
		</div>
	);
};

export default CommentPanel;
