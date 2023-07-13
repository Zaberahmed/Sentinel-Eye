import { FormEvent, useState } from 'react';
import './postFormModal.component.css';
import { createPost } from '../../services/user.service';
interface Props {
	toggleModal: () => void;
}
const PostFormModal = (props: Props) => {
	const [text, setText] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const user_id = '64a8d3809eaf4323bd625c8c';
		const type = 'general';
		const post = { user_id, type, text };
		const result = await createPost(post);
		console.log(result);
		setText('');
		props.toggleModal();
	};
	const validateForm = () => {
		return false;
	};
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
					<div className="form-group">
						<label htmlFor="post-image">Add an image</label>
						<input
							type="file"
							id="post-image"
							name="post-image"
							accept="image/*"
						/>
					</div>
					<div className="form-actions">
						<button
							type="submit"
							disabled={validateForm()}>
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
