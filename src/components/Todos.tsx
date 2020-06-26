import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Todo from './Todo';

import ITodo from '../interfaces/ITodo';

import '../styles/Todos.css';

const TodoApp: React.FC = () => {
	const [ todos, updateTodos ] = useState<ITodo[]>([]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/todos')
			.then((res) => updateTodos(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className='todos'>
			{todos.length &&
				todos.map((todo: ITodo) => {
					return (
						<Todo
							title={todo.title}
							description={todo.description}
							priorityLevel={todo.priorityLevel}
							id={todo.id}
							createdAt={todo.createdAt}
							updatedAt={todo.updatedAt}
							complete={todo.complete}
						/>
					);
				})}
		</div>
	);
};

export default TodoApp;
