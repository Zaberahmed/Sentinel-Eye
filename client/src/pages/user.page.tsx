import { Link, Outlet } from 'react-router-dom';

const UserPage = () => {
	return (
		<div className="user-page-container">
			<Outlet />
			<nav className="naivgation-container">
				<Link to="discover"> Discover</Link>
				<Link to="report"> Report</Link>
				<Link to="community"> Community</Link>
				<Link to="profile"> Profile</Link>
			</nav>
		</div>
	);
};

export default UserPage;
