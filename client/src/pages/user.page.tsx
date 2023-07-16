import { Link, Outlet, NavLink } from 'react-router-dom';
import './user.page.css';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { MdGroups } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GoReport } from 'react-icons/go';
import UserAuthentication from '../interfaces/authentication.interface';
const UserPage = (props: UserAuthentication) => {
	return (
		<div className="user-page-container">
			<div className="component-container">
				<Outlet />
			</div>
			<nav className="navigation-container">
				<NavLink
					to="discover"
					className="menu">
					<RiCompassDiscoverLine size={30} />
					Discover
				</NavLink>

				<NavLink
					to="report"
					className="menu">
					<GoReport size={30} />
					Report
				</NavLink>
				<NavLink
					to="community"
					className="menu">
					<MdGroups size={30} />
					Community
				</NavLink>
				<NavLink
					to="profile"
					className="menu">
					<CgProfile size={28} />
					Profile
				</NavLink>
			</nav>
		</div>
	);
};

export default UserPage;
