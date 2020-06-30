import React, { useState, useEffect } from 'react';

import { v4 as uuid_v4 } from 'uuid';
import axios from 'axios';

import Todo from './Todo';

import ITodo from '../interfaces/ITodo';

import '../styles/Todos.css';

type CategoryProps = {
	name: string;
};

const Todos: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	const [ todos, updateTodos ] = useState<ITodo[]>([]);

	useEffect(
		() => {
			const URL =
				name ? `http://localhost:4000/todos/${name}` :
				'http://localhost:4000/todos';
			axios.get(URL).then((res) => updateTodos(res.data)).catch((err) => console.error(err));
		},
		[ name ]
	);

	// const filteredTodos = todos.filter((todo) => todo.title.some() === 'hello')

	return (
		<div className='todos'>
			{console.log(todos)}
			{todos.length &&
				todos.map((todo: ITodo) => {
					return (
						<Todo
							title={todo.title}
							description={todo.description}
							priority={todo.priority}
							id={todo.id}
							createdAt={todo.createdAt}
							updatedAt={todo.updatedAt}
							complete={todo.complete}
							key={uuid_v4()}
						/>
					);
				})}
		</div>
	);
};

export default Todos;
