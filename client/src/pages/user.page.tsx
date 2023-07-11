import { Link, Outlet } from 'react-router-dom';
import './user.page.css';
import { RiCompassDiscoverLine } from 'react-icons/ri';
const UserPage = () => {
	return (
		<div className="user-page-container">
			<div>
				<Outlet />
			</div>
			<nav className="navigation-container">
				<Link
					to="discover"
					className="menu">
					Discover
				</Link>

				<Link
					to="report"
					className="menu">
					{' '}
					Report
				</Link>
				<Link
					to="community"
					className="menu">
					{' '}
					Community
				</Link>
				<Link
					to="profile"
					className="menu">
					{' '}
					Profile
				</Link>
			</nav>
		</div>
	);
};

export default UserPage;
