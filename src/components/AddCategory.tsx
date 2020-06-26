import React, { useState } from 'react';
import axios from 'axios';

import ITodo from '../interfaces/ITodo';

const AddCategory: React.FC = () => {
	const [ categoryName, updateCategoryName ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addCategory();
		alert('submitefsdafd');
		window.location.reload();
	};

	const addCategory = () => {
		axios.get(`http://localhost:4000/add/category?name=${categoryName}`).catch((err) => console.error(err));
	};

	const handleChange = (e) => {
		const { value } = e.target;
		updateCategoryName(value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input className='add-category' type='text' value={categoryName} onChange={handleChange} />
			</form>
		</div>
	);
};

export default AddCategory;
