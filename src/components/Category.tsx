import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TodosContext } from '../context/TodosContext';
import { CategoryProps } from '../types/CategoryProps';

import '../styles/Category.css';
import { Fetch } from '../utils/Fetch';
import { ITodo } from '../interfaces/ITodo';
import { ICategory } from '../interfaces/ICategory';

const Category: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	const { todosState, categoriesState } = useContext(TodosContext);
	const [ todos, updateTodos ] = todosState;
	const [ categories, updateCategories ] = categoriesState;

	const deleteCategory = () => {
		const URL = `http://localhost:4000/delete/category/${name}`;
		Fetch(URL);
		updateTodos(todos.filter((todo: ITodo) => todo.category !== name));
		updateCategories(categories.filter((category: ICategory) => category.name !== name));
	};

	return (
		<div>
			{console.log(todos)}
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
