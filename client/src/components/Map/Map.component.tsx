import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import './Map.component.css';
import { MapboxSearchBox } from '@mapbox/search-js-web';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';

const MapComponent: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>(null);
	const markerPosition: [number, number] = [-0.1084, 51.5549];
	const searchInputRef = useRef<HTMLInputElement>(null);
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

			const popupOptions: mapboxgl.PopupOptions = { closeOnClick: false, closeButton: false };
			const popup = new mapboxgl.Popup(popupOptions).setHTML('<h3>Popup Content</h3><p>This is the popup content.</p>');

			marker.setPopup(popup);

			const search = new MapboxSearchBox();
			search.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';
			search.theme = {
				variables: {
					colorPrimary: '',
				},
				cssText: '.Input:active { opacity: 0.9; }',
			};
			mapRef.current.addControl(search);
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
		<div className="map-container">
			<div
				ref={mapContainerRef}
				className="map-container"
			/>
		</div>
	);
};

export default MapComponent;
