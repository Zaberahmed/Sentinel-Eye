import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import './Map.component.css';
import { MapboxSearchBox } from '@mapbox/search-js-web';
import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';
import { GetAllCrime } from '../../services/user.service';
import { GetAllCrimeFromUKAPI } from '../../services/uk.service';
import { colorMarker } from '../../utils/colorMarker';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZXItYWhtZWQiLCJhIjoiY2xqdXM1bjB4MWU3MjNmbzR2ZzB6emhneCJ9.nSXKxVjpJs9CMWUTIzuX2Q';

interface MapComponentProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
	dataSource: string;
	mapStyle: string;
	category:string
}

const MapComponent = (props: MapComponentProps) => {
	let currentMarkers: mapboxgl.Marker[] = [];
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>(null);
	const markerPosition: [number, number] = [-0.1084, 51.5549];
	const [ReportedCrimes, setReportedCrimes] = useState<any[]>([]);

	console.log(props.searchResult);

	const fetchCrimeReports = async () => {
		try {
			let result;

			if (props.dataSource === 'police') {
				// console.log(props.searchResult);
				result = await GetAllCrimeFromUKAPI(props.searchResult.longitude, props.searchResult.latitude,props.category);
			} else {
				result = await GetAllCrime();
			}
			// console.log('result:', result);
			const convertedData = result.map((report: any) => ({
				...report,
				longitude: parseFloat(report.location.longitude),
				latitude: parseFloat(report.location.latitude),
			}));

			setReportedCrimes(convertedData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (mapContainerRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: `mapbox://styles/mapbox/${props.mapStyle}?optimize=true`,
				center: [-0.1084, 51.5549],
				zoom: 16,
			});

			const marker = new Marker({ color: '#e303fc', anchor: 'center' }).setLngLat(markerPosition).addTo(mapRef.current);

			const popupOptions: mapboxgl.PopupOptions = { closeOnClick: true, closeButton: true, className: 'example' };
			const popup = new mapboxgl.Popup(popupOptions).setHTML('<h3>Home</h3>');
			popup.addClassName('popup-content');

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
				cssText: '.Input:active { opacity: 0.5; }, .SearchBox {display:flex, justify-content:center,padding: 20px}',
			};

			mapRef.current.addControl(search);

			search.addEventListener('retrieve', async (event) => {
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
	}, [props.dataSource, props.mapStyle]);

	useEffect(() => {
		if (mapRef.current && ReportedCrimes.length > 0) {
			if (currentMarkers) {
				currentMarkers.forEach((marker) => marker.remove());
				currentMarkers = [];
			}
			console.log('reported crimes:', ReportedCrimes);

			ReportedCrimes.forEach((report) => {
				const category = report.category;
				const markerColor = colorMarker[category];
				const marker = new Marker({ color: markerColor, anchor: 'center' }).setLngLat([report.location.longitude, report.location.latitude]).addTo(mapRef.current!);
				currentMarkers.push(marker);
				// const el = document.createElement('div');
				// const width = 27
				// const height = 41

				const popupOptions: mapboxgl.PopupOptions = { closeOnClick: true, closeButton: true };
				const popupContent = `<h3>Category: ${report.category}</h3>
  <p>Context: ${report.context}</p>
  <p>Street Name: ${report.location.street.name}</p>`;
				const popup = new mapboxgl.Popup(popupOptions).setHTML(popupContent);

				marker.setPopup(popup);
			});
		}
	}, [ReportedCrimes]);

	useEffect(() => {
		fetchCrimeReports();
	}, [props.searchResult,props.category]);

	return (
		<div
			ref={mapContainerRef}
			style={{ width: '100%', height: '100%' }}
		/>
	);
};

export default MapComponent;
