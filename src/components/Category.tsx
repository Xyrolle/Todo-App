import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TodosContext } from '../context/TodosContext';
import { CategoryProps } from '../types/CategoryProps';

import '../styles/Category.css';

const Category: React.FC<CategoryProps> = ({ name, id }: CategoryProps) => {
	const { rerenderCategories, rerenderTodos } = useContext(TodosContext);
	const [ , shouldRenderTodos ] = rerenderTodos;
	const [ , shouldRenderCategories ] = rerenderCategories;

	const deleteCategory = () => {
		axios
			.get(`http://localhost:4000/delete/category/${name}`)
			.catch((err) => console.error('error while deleting category', err));
		shouldRenderCategories((should: Boolean) => !should);
		shouldRenderTodos((should: Boolean) => !should);
	};

	return (
		<div>
			<button className='delete-category' onClick={deleteCategory}>
				&times;
			</button>
			<Link to={`/${name}`}>
				<h2 className='category-name'>{name}</h2>
			</Link>
		</div>
	);
};

export default Category;
