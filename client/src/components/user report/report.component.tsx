import { ChangeEvent, FormEvent, useState } from 'react';
import { Report } from '../../interfaces/report.interface';
import './report.componenet.css';
import MapComponent from '../Map/Map.component';
import { SearchResult, SetSearchResult } from '../../interfaces/searchResults.insterface';

interface ReportComponentProps {
	searchResult: SearchResult;
	setSearchResult: SetSearchResult;
}

const ReportComponent = (props: ReportComponentProps) => {
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

	const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();

		const Report = { category, context: description, date };
		// console.log(category, description, date, props.searchResult);

		// Process the form submission or perform any necessary actions
		// Here, you can access the values of 'category', 'description', and 'location'
		// and send them to your backend or perform other operations

		// Reset the form fields
		setCategory('');
		setDescription('');
		setDate('');

		props.setSearchResult({
			latitude: -0.1084,
			longitude: 51.5549,
			street: 'On the Pitch - Emirates Stadium, Arsenal Fc',
		});
	};

	return (
		<div className="report-container">
			<h2 style={{ textAlign: 'center' }}>Report A Crime</h2>

			<div>
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

			<div>
				<label htmlFor="description">Description: </label>
				<textarea
					id="description"
					value={description}
					onChange={handleDescriptionChange}
				/>
			</div>

			<div>
				<label htmlFor="date">Date: </label>
				<input
					type="date"
					id="date"
					value={date}
					max={new Date().toISOString().slice(0, 16)}
					onChange={handleDateChange}
				/>
			</div>

			<div>
				<label htmlFor="location">Location:</label>

				<div className="map">
					<MapComponent
						searchResult={props.searchResult}
						setSearchResult={props.setSearchResult}
					/>
				</div>
			</div>

			<button
				type="submit"
				onClick={handleButtonClick}>
				Report
			</button>
		</div>
	);
};

export default ReportComponent;
