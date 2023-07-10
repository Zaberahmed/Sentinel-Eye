import { ChangeEvent, FormEvent, useState } from 'react';
import { Report } from '../../interfaces/report.interface';

const ReportComponent = () => {
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
	};

	const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};

	const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
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
		setLocation('');
	};

	return (
		<div>
			<h2>Report Crime</h2>
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
						{/* Add more category options as needed */}
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
					<label htmlFor="location">Location:</label>
					<input
						type="text"
						id="location"
						value={location}
						onChange={handleLocationChange}
					/>
				</div>
				<button type="submit">Report</button>
			</form>
		</div>
	);
};

export default ReportComponent;
