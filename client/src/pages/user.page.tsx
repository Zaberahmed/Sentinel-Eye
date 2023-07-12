import { Link, Outlet } from 'react-router-dom';
import './user.page.css';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { MdGroups } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GoReport } from 'react-icons/go';
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
					<RiCompassDiscoverLine size={30} />
					Discover
				</Link>

				<Link
					to="report"
					className="menu">
					<GoReport size={30} />
					Report
				</Link>
				<Link
					to="community"
					className="menu">
					<MdGroups size={30} />
					Community
				</Link>
				<Link
					to="profile"
					className="menu">
					<CgProfile size={28} />
					Profile
				</Link>
			</nav>
		</div>
	);
};

export default UserPage;
