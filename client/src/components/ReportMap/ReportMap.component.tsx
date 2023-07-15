import { useEffect, useRef } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

import { MapboxSearchBox } from '@mapbox/search-js-web';
import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';

interface MapComponentProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
}

const ReportMapComponent = (props: MapComponentProps) => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>(null);
	const markerPosition: [number, number] = [-0.1084, 51.5549];

	useEffect(() => {
		if (mapContainerRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
				center: [-0.1084, 51.5549],
				zoom: 16,
			});

			const marker = new Marker({ color: '#e303fc', anchor: 'center' }).setLngLat(markerPosition).addTo(mapRef.current);

			const popupOptions: mapboxgl.PopupOptions = { closeOnClick: true, closeButton: true };
			const popup = new mapboxgl.Popup(popupOptions).setHTML('<h3>Popup Content</h3><p>This is the popup content.</p>');

			marker.setPopup(popup);

			const search = new MapboxSearchBox();
			search.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';
			search.theme = {
				variables: {
					fontFamily: 'Poppins, sans-serif',
					unit: '15px',
					padding: '0.5em',
					borderRadius: '10px',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
				},
				cssText: '.Input:active { opacity: 0.5; }, .Actionicon .SearchIcon {display:none}',
			};

			mapRef.current.addControl(search);

			search.addEventListener('retrieve', (event) => {
				const featureCollection = event.detail;
				const longitude = featureCollection.features[0].geometry.coordinates[0];
				const latitude = featureCollection.features[0].geometry.coordinates[1];
				const street = featureCollection.features[0].properties.name;
				props.setSearchResult({ longitude, latitude, street: { name: street } });
			});
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
			}
		};
	}, []);

	return (
		<div
			ref={mapContainerRef}
			style={{ width: '100%', height: '100%' }}
		/>
	);
};
export default ReportMapComponent;
