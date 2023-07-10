import { Link, Outlet } from 'react-router-dom';
import './user.page.css';
const UserPage = () => {
	return (
		<div className="user-page-container">
			<div>
				<Outlet />
			</div>
			<nav className="navigation-container">
				<Link to="discover"> Discover</Link>
				<Link to="report"> Report</Link>
				<Link to="community"> Community</Link>
				<Link to="profile"> Profile</Link>
			</nav>
		</div>
	);
};

export default UserPage;
