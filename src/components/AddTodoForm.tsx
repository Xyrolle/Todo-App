import React, { useState } from 'react';
import axios from 'axios';

import ITodo from '../interfaces/ITodo';

const initialState: ITodo = { title: '', description: '', priority: 1 };

const AddTodoForm: React.FC = () => {
	const [ todo, updateTodo ] = useState<ITodo>(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo();
		alert('submited');
	};

	const addTodo = () => {
		const { title, description, priority } = todo;
		updateTodo(initialState);
		axios
			.get(`http://localhost:4000/add/todo?title=${title}&description=${description}&priority=${priority}`)
			.catch((err) => console.error(err));
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
				<div className='select'>
					<label>priority:</label>
					<select>
						<option value='1'>Low</option>
						<option value='2'>Average</option>
						<option value='3'>High</option>
					</select>
				</div>
				<input type='submit' value='Submit' />
			</form>
		</div>
	);
};

export default AddTodoForm;
