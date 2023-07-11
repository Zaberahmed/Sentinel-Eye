import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.component.css';

const SplashComponent = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate('/user');
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	}, [navigate]);

	return (
		<div className="splash-container">
			<img
				className="splash-image"
				src="splash-image.png"
				alt="Splash Image"
			/>
		</div>
	);
};

export default SplashComponent;
