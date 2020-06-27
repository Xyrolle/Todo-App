import React, { useState } from 'react';
import axios from 'axios';

import ITodo from '../interfaces/ITodo';

import '../styles/Todo.css';

const todoPriorityStyles = { 1: 'low-priority', 2: 'medium-priority', 3: 'high-priority' };

const Todo: React.FC<ITodo> = (todo: ITodo) => {
	const [ isEditable, setEditable ] = useState(false);

	const deleteTodo = () => {
		axios.get(`http://localhost:4000/delete/todo/${todo.id}`).catch((err) => console.error(err));
	};

	// const updateTodo = () => {
	// 	// make new todo and place it instead of the old one
	// or update with sqlite query
	// };

	return (
		<div className={'todo ' + todoPriorityStyles[todo.priority]}>
			<button className='delete-todo' onClick={deleteTodo}>
				X
			</button>
			<div
				className='todo-title'
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
			<div className='todo-description'>{todo.description}</div>
			<div>
				Created At:{' '}
				{
					todo.createdAt ? <span className='todo-date'>
						{todo.createdAt.toString().substring(0, 3) + ' ' + todo.createdAt.toString().substring(3, 7)}
					</span> :
					''}
				<br />
				Updated At:{' '}
				{
					todo.updatedAt ? <span className='todo-date'>
						{todo.updatedAt.toString().substring(0, 3) + ' ' + todo.updatedAt.toString().substring(3, 7)}
					</span> :
					''}
			</div>
			{/* <button hidden={!isEditable} onClick={updateTodo}>
				Update
			</button> */}
		</div>
	);
};

export default Todo;
