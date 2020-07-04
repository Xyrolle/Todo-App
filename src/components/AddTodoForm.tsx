import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { TodosContext } from '../context/TodosContext';

import { ITodo, Priority } from '../interfaces/ITodo';

import '../styles/AddTodoForm.css';
import { Fetch } from '../utils/Fetch';

const initialState: ITodo = { title: '', description: '', priority: Priority.LOW };

const AddTodoForm: React.FC<any> = (props: any) => {
	const [ todo, updateTodo ] = useState<ITodo>(initialState);
	const { todosState } = useContext(TodosContext);
	// , because eslint says that I do not use second value
	const [ todos, updateTodos ] = todosState;

	let pathName = props.location.pathname;

	const handleSubmit = (e: any) => {
		e.preventDefault();
		addTodo();
		updateTodo(initialState);
	};

	const addTodo = () => {
		let categoryName = pathName.substring(1);
		const { title, description, priority } = todo;
		const URL = `http://localhost:4000/add/todo?title=${title}&description=${description}&priority=${priority}&category=${categoryName}`;

		// get latest id instead of fetching all todos
		// id is needed to perform deletion
		const GET_LATEST_TODO_ID = 'http://localhost:4000/latest/Todos';
		Fetch(URL, () => Fetch(GET_LATEST_TODO_ID, (res: any) => updateTodos([ ...todos, ...res.data ])));
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		updateTodo({ ...todo, [name]: value });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>title:</label>
				<input type='text' name='title' value={todo.title} onChange={handleChange} />
				<label>description:</label>
				<input type='text' name='description' value={todo.description} onChange={handleChange} />
				<div className='buttons'>
					<label>Low</label>
					<label>Medium</label>
					<label>High</label>
					<span className='break' />
					<input
						type='radio'
						id='low'
						name='priority'
						value={1}
						checked={Number(todo.priority) === Priority.LOW}
						onChange={handleChange}
					/>
					<input
						type='radio'
						name='priority'
						value={2}
						checked={Number(todo.priority) === Priority.MEDIUM}
						onChange={handleChange}
					/>
					<input
						type='radio'
						name='priority'
						value={3}
						checked={Number(todo.priority) === Priority.HIGH}
						onChange={handleChange}
					/>
				</div>
				<input type='submit' className='button' value='Submit' />
			</form>
		</div>
	);
};

export default withRouter(AddTodoForm);
