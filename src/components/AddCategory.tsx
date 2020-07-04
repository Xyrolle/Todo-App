import React, { useState, useContext } from 'react';

import { Fetch } from '../utils/Fetch';

import { TodosContext } from '../context/TodosContext';

const AddCategory: React.FC = () => {
	const [ name, updateCategoryName ] = useState<string>('');
	const { categoriesState } = useContext(TodosContext);
	const [ categories, updateCategories ] = categoriesState;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		addCategory();
		updateCategoryName('');
	};

	const addCategory = () => {
		const URL = `http://localhost:4000/add/category?name=${name}`;
		const GET_LATEST_CATEGORY = 'http://localhost:4000/latest/Categories';

		Fetch(URL, () =>
			Fetch(GET_LATEST_CATEGORY, (res: any) => {
				updateCategories([ ...categories, ...res.data ]);
			})
		);
	};

	const handleChange = (e: any) => {
		const { value } = e.target;
		updateCategoryName(value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input className='add-category' type='text' value={name} onChange={handleChange} />
			</form>
		</div>
	);
};

export default AddCategory;
