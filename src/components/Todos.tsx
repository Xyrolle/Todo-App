import React, { useEffect, useContext } from 'react';
import { v4 as uuid_v4 } from 'uuid';

import Todo from './Todo';

import { ITodo } from '../interfaces/ITodo';
import { TodosContext } from '../context/TodosContext';
import { CategoryProps } from '../types/CategoryProps';

import '../styles/Todos.css';
import { Fetch } from '../utils/Fetch';

const Todos: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	const { todosState, filter, sort } = useContext(TodosContext);
	const [ todos, updateTodos ] = todosState;
	const [ filterString ] = filter;
	const [ sorted ] = sort;

	useEffect(
		() => {
			const URL =
				name ? `http://localhost:4000/todos/${name}` :
				`http://localhost:4000/todos/`;
			Fetch(URL, (res: any) => updateTodos(res.data));
		},
		[ name, updateTodos ]
	);

	let filteredTodos = todos.filter(
		(todo: ITodo) => todo.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1
	);

	if (sorted) {
		filteredTodos.sort((a: ITodo, b: ITodo) => b.priority - a.priority);
	}

	return (
		<div className='todos'>
			{filteredTodos.length &&
				filteredTodos.map((todo: ITodo) => {
					return (
						<Todo
							title={todo.title}
							description={todo.description}
							priority={todo.priority}
							id={todo.id}
							createdAt={todo.createdAt}
							updatedAt={todo.updatedAt}
							key={uuid_v4()}
						/>
					);
				})}
		</div>
	);
};

export default Todos;
