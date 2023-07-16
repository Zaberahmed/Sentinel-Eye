import { FormEvent, useEffect, useState } from 'react';
import './postFormModal.component.css';
import { Profile, createPost } from '../../services/user.service';
import { Post } from '../../interfaces/post.interface';
import { RegisteredUser } from '../../interfaces/user.interface';

interface Props {
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
	toggleModal: () => void;
}

const PostFormModal = (props: Props) => {
	const [text, setText] = useState<string>('');
	const [user, setuser] = useState<RegisteredUser>();
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (user?._id) {
			const user_id = user._id;
			const user_name = user.name;
			const type = 'general';
			const timestamp = new Date().getTime().toString();
			const post = { user_id, user_name, type, timestamp, text, isVerified: false };
			const result = await createPost(post);
			console.log(result);
			setText('');
			props.setPosts((prevState: Post[]) => {
				const updatedPosts = [...prevState, post];
				const sortedPosts = updatedPosts.sort((a: Post, b: Post) => parseInt(b.timestamp) - parseInt(a.timestamp));
				return sortedPosts;
			});
			props.toggleModal();
		}
	};
	const validateForm = () => {
		return !text;
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await Profile();
				console.log(result);
				setuser(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, []);
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Add New Post</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<textarea
							id="post-text"
							name="post-text"
							rows={4}
							cols={50}
							placeholder="Enter your post text"
							onChange={(event) => setText(event.target.value)}></textarea>
					</div>

					<div className="form-actions">
						<button
							type="submit"
							disabled={validateForm()}
							className="submit-button">
							Done
						</button>
						<button
							type="button"
							className="cancel-button"
							onClick={() => props.toggleModal()}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostFormModal;
