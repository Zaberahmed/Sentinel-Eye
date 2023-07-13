import logo from './../../assets/splash-image.png';
import pp from './../../assets/PP.jpg';
import './community.component.css';
import { GrAdd } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import PostFormModal from './postFormModal.component';
import { Post } from '../../interfaces/post.interface';
import { GetAllPost } from '../../services/user.service';
import formatTime from '../../utils/formatTime';

const CommunityComponent = () => {
	const [showModal, setShowModal] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const results = await GetAllPost();
				console.log(results);
				const sortedResult = results.sort((a: Post, b: Post) => parseInt(b.timestamp) - parseInt(a.timestamp));

				setPosts(sortedResult);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllPosts();
	}, []);

	return (
		<div className="community-container">
			<div className="post-start">
				<img
					src={pp}
					height={40}
					className="image-avatar"
				/>

				<div className="post-bubble">Share anything you want.</div>
				<button onClick={() => toggleModal()}>
					<GrAdd size={15} />
				</button>
			</div>
			<div className="post-container">
				{posts.map((post) => (
					<div
						className="post-content"
						key={post._id}>
						<div className="post-header">
							<img
								src={logo}
								className="profile-picture"
								alt="Profile Picture"
							/>
							<div className="profile-info">
								<h3 className="profile-name">Sk. Zaber Ahmed</h3>
								<p className="post-time">{formatTime(parseInt(post.timestamp ?? ''))}</p>
							</div>
						</div>
						<p className="post-text">{post.text}</p>

						<div className="post-actions">
							<button className="review-button">Like</button>
							<button className="comment-button">Comment</button>
						</div>
					</div>
				))}
			</div>
			{showModal && <PostFormModal toggleModal={toggleModal} />}
		</div>
	);
};

export default CommunityComponent;
