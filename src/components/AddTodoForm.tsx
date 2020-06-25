import React, { useState } from 'react';
import axios from 'axios';

import ITodo from '../interfaces/ITodo';

const AddTodoForm: React.FC = () => {
	const [ todo, updateTodo ] = useState<ITodo>({ title: '', description: '', priority: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo();
		alert('submited');
	};

	const addTodo = () => {
		const { title, description, priority } = todo;
		axios
			.get(`http://localhost:4000/addTodo?title=${title}&description=${description}&priority=${priority}`)
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
				<label>priority:</label>
				<label>1</label>
				<input type='radio' name='priority' value='1' onChange={handleChange} />
				<label>2</label>
				<input type='radio' name='priority' value='2' onChange={handleChange} />
				<label>3</label>
				<input type='radio' name='priority' value='3' onChange={handleChange} />
				<input type='submit' value='Submit' />
			</form>
		</div>
	);
};

export default AddTodoForm;
