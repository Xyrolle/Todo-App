import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TodosContext } from '../context/TodosContext';

import '../styles/Category.css';

type CategoryProps = {
	name: string;
	id: number;
};

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
			<button id='category' className='delete' onClick={deleteCategory}>
				&times;
			</button>
			<Link to={`/${name}`}>
				<h2 className='category-name'>{name}</h2>
			</Link>
		</div>
	);
};

export default Category;
