import { ChangeEvent, FormEvent, useState } from 'react';
import { Report } from '../../interfaces/report.interface';
import './report.componenet.css';
import MapComponent from '../Map/Map.component';
import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';
import { ReportCrime } from '../../services/User.service';
import { useNavigate } from 'react-router-dom';

interface ReportComponentProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
}

const ReportComponent = (props: ReportComponentProps) => {
	const navigate = useNavigate();
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');

	const [date, setDate] = useState('');
	const [formattedDate, setFormattedDate] = useState('');

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	};

	const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};
	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedDate = event.target.value;
		setDate(selectedDate);

		const formatted = new Date(selectedDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		setFormattedDate(formatted);
	};

	const handleButtonClick = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const street = { name: props.searchResult.street.name };

		const location = { latitude: props.searchResult.latitude.toString(), street: street, longitude: props.searchResult.longitude.toString() };
		const user_id = '64a8d3809eaf4323bd625c8c';

		const report = { user_id, category, context: description, date, location };

		const result = await ReportCrime(report);
		console.log(result);

		if (result) {
			//toaster for completion
			navigate('/user/discover');
		}

		setCategory('');
		setDescription('');
		setDate('');

		props.setSearchResult({
			latitude: -0.1084,
			longitude: 51.5549,
			street: { name: 'On the Pitch - Emirates Stadium, Arsenal Fc' },
		});
	};
	const validateReport = (): boolean => {
		return !category || !date || !location;
	};
	return (
		<div className="report-container">
			<h2 style={{ textAlign: 'start' }}>Report A Crime</h2>

			<div className="crime-category">
				<label htmlFor="category">Category: </label>
				<select
					id="category"
					value={category}
					onChange={handleCategoryChange}>
					<option value="">Select Category</option>
					<option value="Theft">Theft</option>
					<option value="Assault">Assault</option>
					<option value="Vandalism">Vandalism</option>
				</select>
			</div>

			<div className="crime-date">
				<label htmlFor="date">Date: </label>
				<input
					type="date"
					id="date"
					value={date}
					max={new Date().toISOString().slice(0, 16)}
					onChange={handleDateChange}
				/>
			</div>

			<div className="crime-description">
				<label htmlFor="description">Description: </label>
				<textarea
					id="description"
					value={description}
					onChange={handleDescriptionChange}
				/>
			</div>

			<div className="crime-location">
				<label htmlFor="location">Location:</label>

				<div className="map">
					<MapComponent
						searchResult={props.searchResult}
						setSearchResult={props.setSearchResult}
					/>
				</div>
			</div>
			<div className="report-button">
				<button
					type="submit"
					disabled={validateReport()}
					onClick={handleButtonClick}>
					Report
				</button>
			</div>
		</div>
	);
};

export default ReportComponent;
