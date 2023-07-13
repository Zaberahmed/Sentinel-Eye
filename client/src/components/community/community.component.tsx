import logo from './../../assets/splash-image.png';
import pp from './../../assets/PP.jpg';
import './community.component.css';
import { GrAdd } from 'react-icons/gr';
import { useState } from 'react';
import PostFormModal from './postFormModal.component';

const CommunityComponent = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

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
				<div className="post-content">
					<div className="post-header">
						<img
							src={logo}
							className="profile-picture"
							alt="Profile Picture"
						/>
						<div className="profile-info">
							<h3 className="profile-name">John Doe</h3>
							<p className="post-time">2 hours ago</p>
						</div>
					</div>
					<p className="post-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<img
						src={logo}
						alt="post image"></img>
					<div className="post-actions">
						<button className="review-button">Like</button>
						<button className="comment-button">Comment</button>
					</div>
				</div>

				<div className="post-content">
					<div className="post-header">
						<img
							src={logo}
							className="profile-picture"
							alt="Profile Picture"
						/>
						<div className="profile-info">
							<h3 className="profile-name">John Doe</h3>
							<p className="post-time">2 hours ago</p>
						</div>
					</div>
					<p className="post-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<img
						src={logo}
						alt="post image"></img>
					<div className="post-actions">
						<button className="review-button">Like</button>
						<button className="comment-button">Comment</button>
					</div>
				</div>
				<div className="post-content">
					<p className="post-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<a href="discover"> See on map</a>
					<div className="post-actions">
						<button className="review-button">Verify</button>
						<button className="comment-button">Comment</button>
					</div>
				</div>
			</div>
			{showModal && <PostFormModal toggleModal={toggleModal} />}
		</div>
	);
};

export default CommunityComponent;
