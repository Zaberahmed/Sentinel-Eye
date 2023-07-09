import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import './Map.component.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';

const MapComponent: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>(null);
	const markerPosition: [number, number] = [-2.200941, 53.483135];
	const [searchValue, setSearchValue] = useState<string>('');
	useEffect(() => {
		if (mapContainerRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
				center: [-2.200941, 53.483135],
				zoom: 16,
			});

			const marker = new Marker().setLngLat(markerPosition).addTo(mapRef.current);

			const popupOptions: mapboxgl.PopupOptions = { closeOnClick: false, closeButton: false };
			const popup = new mapboxgl.Popup(popupOptions).setHTML('<h3>Popup Content</h3><p>This is the popup content.</p>');

			marker.setPopup(popup);
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
			className="map-container"
		/>
	);
};

export default MapComponent;
