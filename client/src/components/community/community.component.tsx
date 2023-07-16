import logo from './../../assets/splash-image.png';
import pp from './../../assets/PP.jpg';
import './community.component.css';
import { GrAdd } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import PostFormModal from './postFormModal.component';
import { Post } from '../../interfaces/post.interface';
import { GetAllPost, GetUser, Profile, UpdatePost } from '../../services/user.service';
import formatTime from '../../utils/formatTime';
import { RegisteredUser } from '../../interfaces/user.interface';
import CommentPanel from './commentPanel.component';
import calculateEuclideanDistance from '../../utils/calculateDistance';

const CommunityComponent = () => {
	const [showModal, setShowModal] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);
	const [user, setuser] = useState<RegisteredUser>();
	const [openPostId, setOpenPostId] = useState<string>('');
	const [verify, setVerify] = useState<boolean>(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const toggleCommentPanel = (postId: string, post: Post) => {
		setOpenPostId(postId === openPostId ? '' : postId);
	};
	const handleVerify = async (post: Post) => {
		const result = await GetUser({ _id: post.user_id });

		const address_one = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${result?.address}.json?access_token=pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q`).then((res) => res.json());
		const address_two = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.address}.json?access_token=pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q`).then((res) => res.json());

		const coordinates_one = address_one.features[0].geometry.coordinates;
		const coordinates_two = address_two.features[0].geometry.coordinates;

		// if (coordinates_one === coordinates_two) console.log('Yes');
		if (calculateEuclideanDistance(coordinates_one, coordinates_two) < 100) {
			//update the property of the post.
			const result = await UpdatePost({ _id: post._id });
			console.log(result);
		}
	};
	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const results = await GetAllPost();

				const sortedResult = results.sort((a: Post, b: Post) => parseInt(b.timestamp) - parseInt(a.timestamp));

				setPosts(sortedResult);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllPosts();
	}, []);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await Profile();

				setuser(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
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
						key={post.timestamp}>
						<div className="post-header">
							<img
								src={logo}
								className="profile-picture"
								alt="Profile Picture"
							/>
							<div className="profile-info">
								<h3 className="profile-name">{post.user_name}</h3>
								<p className="post-time">{formatTime(parseInt(post.timestamp ?? ''))}</p>
							</div>
						</div>
						<p className="post-text">{post.text}</p>

						<div className="post-actions">
							{user?._id !== post.user_id ? (
								<button
									className="review-button"
									onClick={() => handleVerify(post)}>
									{post.isVerified ? 'Verified' : 'Verify'}
								</button>
							) : null}

							<button
								className="comment-button"
								onClick={() => post._id && toggleCommentPanel(post._id, post)}>
								Comment
							</button>
						</div>
						{openPostId === post._id && <CommentPanel post={post} />}
					</div>
				))}
			</div>
			{showModal && (
				<PostFormModal
					key={user?._id}
					setPosts={setPosts}
					toggleModal={toggleModal}
				/>
			)}
		</div>
	);
};

export default CommunityComponent;
