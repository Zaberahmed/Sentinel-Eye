import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import './Map.component.css';
import { MapboxSearchBox } from '@mapbox/search-js-web';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';

interface MapComponentProps {
	onSearchResult: (result: SearchResult) => void;
}

const MapComponent: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>(null);
	const markerPosition: [number, number] = [-0.1084, 51.5549];

	const [mapStyle, setMapStyle] = useState<'streets-v11' | 'dark-v10'>('streets-v11');
	useEffect(() => {
		if (mapContainerRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: `mapbox://styles/mapbox/${mapStyle}?optimize=true`,
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
				cssText: '.Input:active { opacity: 0.5; }',
			};

			mapRef.current.addControl(search);

			// const inputElement = search.input;
			// inputElement.addEventListener('change', (event) => {
			// 	const newValue = (event.target as HTMLInputElement).value;
			// 	console.log(newValue);
			// });
			search.addEventListener('retrieve', (event) => {
				const featureCollection = event.detail;
				console.log(featureCollection.features[0].geometry.coordinates);
			});

			// const geoCoder = new MapboxGeoCoder();
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
			}
		};
	}, [mapStyle]);
	const toggleMapStyle = () => {
		setMapStyle((prevStyle) => (prevStyle === 'streets-v11' ? 'dark-v10' : 'streets-v11'));
	};

	return (
		<div
			ref={mapContainerRef}
			style={{ width: '100%', height: '100%' }}
		/>
	);
};

export default MapComponent;
