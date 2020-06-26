import React, { useState } from 'react';
import axios from 'axios';

import ITodo from '../interfaces/ITodo';

import '../styles/Todo.css';

const Todo: React.FC<ITodo> = (todo: ITodo) => {
	const [ isEditable, setEditable ] = useState(false);

	const deleteTodo = () => {
		axios.get(`http://localhost:4000/delete/todo/${todo.id}`).catch((err) => console.error(err));
	};

	const updateTodo = () => {
		// make new todo and place it instead of the
	};

	return (
		<div className='todo'>
			<div
				className='todo-info'
				contentEditable={

						isEditable ? true :
						false
				}
				onClick={() => {
					setEditable((st) => !st);
				}}
			>
				{todo.title}
			</div>
			<div>{todo.description}</div>
			<button hidden={!isEditable} onClick={updateTodo}>
				Update
			</button>

			<button onClick={deleteTodo}>X</button>
		</div>
	);
};

export default Todo;
