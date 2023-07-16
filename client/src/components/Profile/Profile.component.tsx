import './Profile.component.css';
import pp from '../../assets/PP.jpg';
import { useEffect, useState } from 'react';
import { RegisteredUser } from '../../interfaces/user.interface';
import { Profile, logout } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import UserAuthentication from '../../interfaces/authentication.interface';

function ProfileComponent(props: UserAuthentication) {
	const [profile, setProfile] = useState<RegisteredUser>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const result = await Profile();
				setProfile(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProfile();
	}, []);
	const handleLogout = async () => {
		try {
			await logout();

			localStorage.removeItem('accessToken');

			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="profile-card">
			<div className="profile-image">
				<img
					src={pp}
					alt="Profile Image"
				/>
			</div>
			<div className="profile-info">
				<h2>{profile?.name}</h2>
				<p>Gender: {profile?.gender}</p>
				<p>Location: {profile?.address}</p>
				<p>Email: {profile?.email}</p>
				<div className="logout-button">
					<button onClick={() => handleLogout}>Logout</button>
				</div>
			</div>
		</div>
	);
}

export default ProfileComponent;
