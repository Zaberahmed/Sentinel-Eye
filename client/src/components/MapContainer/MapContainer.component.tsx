import { useState } from 'react';
import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';
import MapComponent from '../Map/Map.component';
import './MapContainer.component.css';
import { MdLocalPolice } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { CgStyle } from 'react-icons/cg';

interface MapContainerProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
}
const MapContainerComponent = (props: MapContainerProps) => {
	const [dataSource, setDataSource] = useState<'police' | 'user'>('user');
	const [mapStyle, setMapStyle] = useState<'streets-v11' | 'dark-v10'>('streets-v11');

	const handleToggleDataSource = () => {
		setDataSource(dataSource === 'police' ? 'user' : 'police');
	};
	const handleChangeMapStyle = () => {
		setMapStyle(mapStyle === 'streets-v11' ? 'dark-v10' : 'streets-v11');
	};

	return (
		<div className="map-container">
			<div className="toggle-container">
				<button
					className="source-toggle-button"
					onClick={handleToggleDataSource}>
					{dataSource === 'police' ? <MdLocalPolice size={20} /> : <AiOutlineUser size={20} />}
				</button>
				<button
					className="style-toggle-button"
					onClick={handleChangeMapStyle}>
					<CgStyle size={20} />
				</button>
			</div>

			<MapComponent
				searchResult={props.searchResult}
				setSearchResult={props.setSearchResult}
				dataSource={dataSource}
				mapStyle={mapStyle}
			/>
		</div>
	);
};

export default MapContainerComponent;
