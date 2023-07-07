import { Link } from 'react-router-dom';

const LandingComponent = () => {
	return (
		<div>
			<Link to="/login">Login</Link>
			<p>
				Don't have an account?{' '}
				<span>
					<Link to="/register">Signup</Link>
				</span>
			</p>
		</div>
	);
};

export default LandingComponent;
