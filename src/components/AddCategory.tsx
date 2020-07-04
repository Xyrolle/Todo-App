import React, { useState, useContext } from 'react';

import { Fetch } from '../utils/Fetch';

import { TodosContext } from '../context/TodosContext';

const AddCategory: React.FC = () => {
	const [ categoryName, updateCategoryName ] = useState<string>('');
	const { rerenderCategories } = useContext(TodosContext);
	const [ , updateShouldRenderCategories ] = rerenderCategories;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		addCategory();
		updateCategoryName('');
	};

	const addCategory = () => {
		const URL = `http://localhost:4000/add/category?name=${categoryName}`;
		Fetch(URL, () => {
			updateShouldRenderCategories((shouldRenderCategories: Boolean) => !shouldRenderCategories);
		});
	};

	const handleChange = (e: any) => {
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
