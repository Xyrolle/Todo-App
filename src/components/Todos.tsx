import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Todo from './Todo';
import AddTodoForm from './AddTodoForm';

import ITodo from '../interfaces/ITodo';

const TodoApp: React.FC = () => {
	const [ todos, updateTodos ] = useState<ITodo[]>([]);

	useEffect(() => {
		axios.get('http://localhost:4000/todos').then((data) => updateTodos(data.data));
	});

	return (
		<div>
			{todos.map((todo: ITodo) => {
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
			<AddTodoForm />
		</div>
	);
};

export default TodoApp;
