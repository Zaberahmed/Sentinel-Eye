import { ChangeEvent, FormEvent, useState } from 'react';
import { Report } from '../../interfaces/report.interface';
import './report.componenet.css';
import { format } from 'date-fns';
import MapComponent from '../Map/Map.component';

const ReportComponent = () => {
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState(new Date().toISOString());

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	};

	const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};
	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedDate = event.target.value;
		const formattedDate = format(new Date(selectedDate), 'dd/MM/yyyy');
		setDate(formattedDate);
	};

	const handleLocationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setLocation(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Process the form submission or perform any necessary actions
		// Here, you can access the values of 'category', 'description', and 'location'
		// and send them to your backend or perform other operations

		// Reset the form fields
		setCategory('');
		setDescription('');
		setDate('');
		setLocation('');
	};

	return (
		<div className="report-container">
			<h2 style={{ textAlign: 'center' }}>Report A Crime</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="category">Category:</label>
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
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<div>
					<label htmlFor="date">Date:</label>
					<input
						type="date"
						id="date"
						value={date}
						max={new Date().toISOString().slice(0, 16)}
						onChange={handleDateChange}
					/>
				</div>
				<div className="map">
					<MapComponent />
				</div>

				<button type="submit">Report</button>
			</form>
		</div>
	);
};

export default ReportComponent;
