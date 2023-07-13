import './postFormModal.component.css';
interface Props {
	toggleModal: () => void;
}
const PostFormModal = (props: Props) => {
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Add New Post</h2>
				<form>
					<div className="form-group">
						<label htmlFor="post-text">Post:</label>
						<textarea
							id="post-text"
							name="post-text"
							rows={4}
							cols={50}
							placeholder="Enter your post text"></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="post-image">Image:</label>
						<input
							type="file"
							id="post-image"
							name="post-image"
							accept="image/*"
						/>
					</div>
					<div className="form-actions">
						<button type="submit">Submit</button>
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
