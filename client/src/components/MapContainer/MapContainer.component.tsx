import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';
import MapComponent from '../Map/Map.component';

interface MapContainerProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
}
const MapContainerComponent = (props: MapContainerProps) => {
	return (
		<div className="map-container">
			<MapComponent
				searchResult={props.searchResult}
				setSearchResult={props.setSearchResult}
			/>
		</div>
	);
};

export default MapContainerComponent;
