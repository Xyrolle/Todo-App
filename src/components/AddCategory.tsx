import React, { useState, useContext } from 'react';
import axios from 'axios';

import { TodosContext } from '../context/TodosContext';

const AddCategory: React.FC = () => {
	const [ categoryName, updateCategoryName ] = useState('');
	const { rerenderCategories } = useContext(TodosContext);
	const [ , updateShouldRenderCategories ] = rerenderCategories;

	const handleSubmit = (e) => {
		e.preventDefault();
		addCategory();
		updateCategoryName('');
		updateShouldRenderCategories((shouldRenderCategories: Boolean) => !shouldRenderCategories);
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
