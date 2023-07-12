import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.component.css';
import splashimage from './../../../public/splash-image.png';
const SplashComponent = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState<boolean>(false);
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate('/user');
		}, 2300);

		return () => {
			clearTimeout(timeout);
		};
	}, [navigate]);

	const handleImageLoad = () => {
		setImage(true);
	};

	return (
		<div className="splash-container">
			<img
				className={`splash-image ${image ? 'loaded' : ''}`}
				src={splashimage}
				alt="Splash Image"
				onLoad={handleImageLoad}
			/>
			{image && <h1 className="app-name">Sentinel Eye</h1>}
		</div>
	);
};

export default SplashComponent;
