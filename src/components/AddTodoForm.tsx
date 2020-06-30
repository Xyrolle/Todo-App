import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { TodosContext } from '../context/TodosContext';

import { ITodo, Priority } from '../interfaces/ITodo';

import '../styles/AddTodoForm.css';

const initialState: ITodo = { title: '', description: '', priority: Priority.LOW };

const AddTodoForm: React.FC<any> = (props: any) => {
	const [ todo, updateTodo ] = useState<ITodo>(initialState);
	const { rerenderTodos } = useContext(TodosContext);
	// , because eslint says that I do not use second value
	const [ , updateShouldRenderTodos ] = rerenderTodos;

	let pathName = props.location.pathname;

	const handleSubmit = (e) => {
		e.preventDefault();

		addTodo();
	};

	const addTodo = () => {
		let category = pathName.substring(1);
		const { title, description, priority } = todo;
		updateTodo(initialState);
		axios
			.get(
				`http://localhost:4000/add/todo?title=${title}&description=${description}&priority=${priority}&category=${category}`
			)
			.catch((err) => console.error(err));
		updateShouldRenderTodos((shouldRenderTodos: Boolean) => !shouldRenderTodos);
	};

	const handleChange = (e) => {
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
						value='1'
						checked={todo.priority === Priority.LOW}
						onChange={handleChange}
					/>
					<input
						type='radio'
						name='priority'
						value='2'
						checked={Number(todo.priority) === Priority.MEDIUM}
						onChange={handleChange}
					/>
					<input
						type='radio'
						name='priority'
						value='3'
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
